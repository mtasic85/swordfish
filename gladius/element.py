__all__ = ['ElementType', 'Element', 'Text', 'VoidElement', 'ContainerElement']

import json
# import inspect
from typing import Any, Optional, Callable

from .types import BaseGladius
from .defs import VOID_TAGS, CONTAINER_TAGS


class ElementType(type):
    ctx: BaseGladius
    tag: str | None
    void_element: bool


    def __getattr__(cls, tag: str) -> 'ElementType':
        assert tag in VOID_TAGS or tag in CONTAINER_TAGS or '_' in tag, f'unsupported tag {tag!r}'

        # web component / pyscript
        if '_' in tag:
            tag = tag.replace('_', '-')

        et: ElementType = ElementType(
            tag,
            (VoidElement if tag in VOID_TAGS else ContainerElement,),
            {},
        )

        return et


class Element(metaclass=ElementType):
    ctx: BaseGladius
    tag: str | None
    attrs: dict[str, Any]

    # A void element is an element in HTML that cannot have any child nodes
    # (i.e., nested elements or text nodes).
    # Void elements only have a start tag;
    # end tags must not be specified for void elements.
    # https://developer.mozilla.org/en-US/docs/Glossary/Void_element
    void_element: bool


    def __init__(self, /, inline: bool=False, attrs: Optional[dict]=None, **kwargs):
        self.attrs = dict(kwargs)

        if attrs:
            self.attrs.update(attrs)

        # print(self.attrs)

        if not inline and self.ctx.element_scopes:
            parent_element: ContainerElement = self.ctx.element_scopes[-1]
            parent_element.add(self)


    def __repr2__(self, indet: int=0):
        return super().__repr__()


    def __repr__(self) -> str:
        return self.__repr2__()


    def __len__(self) -> int:
        return 0


    def __enter__(self):
        return self


    def __exit__(self, exc_type, exc_value, traceback):
        if exc_type is not None:
            raise exc_value.with_traceback(traceback)


    def render(self, indent: int=0) -> str:
        raise NotImplementedError('override render method')


    def render_attrs(self) -> str:
        text: list[str] | str = []

        for k, v in self.attrs.items():
            if v is None:
                text.append(self.render_attr_key(k))
            else:
                text.append(f'{self.render_attr_key(k)}={self.render_attr_value(v)}')

        text = ' '.join(text)
        return text


    def render_attr_key(self, key: str) -> str:
        # alpinejs
        if key.startswith('a__'):
            key = key.replace('a__', '@', 1)
        elif key.startswith('c__'):
            key = key.replace('c__', ':', 1)

        # alpinejs
        if '__d__' in key:
            key = key.replace('__d__', '.')

        # python reserved keywords
        if key.endswith('_'):
            key = key[:-1]

        key = key.replace('_', '-')
        return key


    def render_attr_value(self, value: Any) -> str:
        return json.dumps(str(value))


class Text(Element):
    tag = None
    void_element = True
    text_content: str


    def __init__(self, text_content: str, inline: bool=False):
        super().__init__(inline=inline)
        self.text_content = text_content


    def __repr2__(self, indent: int=0) -> str:
       text: list[str] | str = []
       text.append(' ' * indent)
       text.append('<')
       text.append(self.__class__.__name__)
       text.append(f' text_content={self.text_content!r}')
       text.append('>')
       text = ''.join(text)
       return text


    def __repr__(self) -> str:
        return self.__repr2__()


    def __len__(self) -> int:
        return len(self.text_content)


    def __getitem__(self, index: int) -> str:
        return self.text_content[index]


    def render(self, indent : int=0) -> str:
        return (' ' * indent) + self.text_content


class VoidElement(Element):
    void_element = True


    def __init__(self, /, **kwargs):
        super().__init__(**kwargs)


    def __repr2__(self, indent: int=0) -> str:
        text: list[str] | str = []
        text.append(' ' * indent)
        text.append('<')
        text.append(self.__class__.__name__)

        # for k, v in self.attrs.items():
        #     text.append(f' {self.render_attr_key(k)}={self.render_attr_value(v)}')
        if self.attrs:
            text.append(' ')
            text.append(self.render_attrs())

        text.append('>')
        text = ''.join(text)
        return text


    def __repr__(self):
        return self.__repr2__()


    def __len__(self) -> int:
        return 0


    def render(self, indent : int=0) -> str:
        text: list[str] | str = []
        text.append(' ' * indent)
        text.append('<')
        text.append(self.__class__.__name__)

        # for k, v in self.attrs.items():
        #     text.append(f' {self.render_attr_key(k)}={self.render_attr_value(v)}')
        if self.attrs:
            text.append(' ')
            text.append(self.render_attrs())

        text.append('/>')
        text = ''.join(text)
        return text



class ContainerElement(Element):
    void_element = False
    children: list[Element | Callable]


    def __init__(self, text_content: str | None=None, children: Optional[list[Element | Callable]]=None, **kwargs):
        super().__init__(**kwargs)
        self.children = children if children else []

        if text_content:
            text_node: Element = self.ctx.text(text_content, inline=True) # type: ignore
            self.children.append(text_node)


    def __repr2__(self, indent: int=0) -> str:
        text: list[str] | str = []
        text.append(' ' * indent)
        text.append(f'<{self.__class__.__name__}')

        # for k, v in self.attrs.items():
        #     text.append(f' {self.render_attr_key(k)}={self.render_attr_value(v)}')
        if self.attrs:
            text.append(' ')
            text.append(self.render_attrs())

        text.append(' children=[')

        if self.children:
            text.append('\n')

        for n in self.children:
            if isinstance(n, Callable):
                # if inspect.signature(n).parameters:
                #     n = n(self)
                # else:
                #     n = n()
                n = n(self)

            text.append(n.__repr2__(indent + 2))
            text.append(',\n')

        if self.children:
            text.append(' ' * indent)

        text.append(']>')
        text = ''.join(text)
        return text


    def __repr__(self):
        return self.__repr2__()


    def __len__(self) -> int:
        return len(self.children)


    def __getitem__(self, index: int) -> Element:
        return self.children[index] # type: ignore


    def __enter__(self):
        assert isinstance(self, ContainerElement), "only container elements can contain other elements"
        self.ctx.element_scopes.append(self)
        return self


    def __exit__(self, exc_type, exc_value, traceback):
        if exc_type is not None:
            raise exc_value.with_traceback(traceback)

        _: Element = self.ctx.element_scopes.pop()


    def add(self, *args) -> 'Element':
        assert all(isinstance(n, (Element, str)) for n in args)

        if self.children is None:
            self.children = []

        new_args: list[Element] = []

        for n in args:
            if isinstance(n, str):
                n = self.ctx.text(n, inline=True) # type: ignore

            new_args.append(n)

        self.children.extend(new_args)
        return self


    def render(self, indent : int=0) -> str:
        text: list[str] | str = []

        if self.tag == 'html':
            text.append('<!DOCTYPE html>\n')

        text.append(' ' * indent)
        text.append(f'<{self.__class__.__name__}')

        # for k, v in self.attrs.items():
        #     text.append(f' {self.render_attr_key(k)}={self.render_attr_value(v)}')
        if self.attrs:
            text.append(' ')
            text.append(self.render_attrs())

        text.append('>')

        if self.children:
            text.append('\n')

        for n in self.children:
            if isinstance(n, Callable):
                # if inspect.signature(n).parameters:
                #     n = n(self)
                # else:
                #     n = n()
                n = n(self)

            text.append(n.render(indent + 2))
            text.append('\n')

        if self.children:
            text.append(' ' * indent)

        text.append(f'</{self.__class__.__name__}>')
        text = ''.join(text)
        return text
