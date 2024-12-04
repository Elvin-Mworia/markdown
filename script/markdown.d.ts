declare class HtmlHandler {
    private markdownChange;
    TextChangeHandler(id: string, output: string): void;
    private RenderHtmlContent;
}
declare enum TagType {
    Paragraph = 0,
    Header1 = 1,
    Header2 = 2,
    Header3 = 3,
    HorizontalRule = 4
}
declare class TagTypeToHtml {
    private readonly tagType;
    constructor();
    OpeningTag(tagType: TagType): string;
    ClosingTag(tagType: TagType): string;
    private GetTag;
}
interface IMarkdownDocument {
    Add(...content: string[]): void;
    Get(): string;
}
declare class MarkdownDocument implements IMarkdownDocument {
    private content;
    Add(...content: string[]): void;
    Get(): string;
}
declare class ParseElement {
    CurrentLine: string;
}
interface IVisitor {
    Visit(token: ParseElement, markdownDocument: IMarkdownDocument): void;
}
interface IVisitable {
    Accept(visitor: IVisitor, token: ParseElement, markdownDocument: IMarkdownDocument): void;
}
declare abstract class VisitorBase implements IVisitor {
    private readonly tagType;
    private readonly TagTypeToHtml;
    constructor(tagType: TagType, TagTypeToHtml: TagTypeToHtml);
    Visit(token: ParseElement, markdownDocument: IMarkdownDocument): void;
}
declare class Header1Visitor extends VisitorBase {
    constructor();
}
declare class Header2Visitor extends VisitorBase {
    constructor();
}
declare class Header3Visitor extends VisitorBase {
    constructor();
}
declare class ParagraphVisitor extends VisitorBase {
    constructor();
}
declare class HorizontalRuleVisitor extends VisitorBase {
    constructor();
}
declare class Visitable implements IVisitable {
    Accept(visitor: IVisitor, token: ParseElement, markdownDocument: IMarkdownDocument): void;
}
declare abstract class Handler<T> {
    protected next: Handler<T> | null;
    SetNext(next: Handler<T>): void;
    HandleRequest(request: T): void;
    protected abstract CanHandle(request: T): boolean;
}
/**looks to see if the text starts with a tag. If it
does, we set the boolean part of our tuple to true and use substr to get the
remainder of our text. */
declare class LineParser {
    Parse(value: string, tag: string): [boolean, string];
}
declare class ParseChainHandler extends Handler<ParseElement> {
    private readonly document;
    private readonly tagType;
    private readonly visitor;
    private readonly visitable;
    protected CanHandle(request: ParseElement): boolean;
    constructor(document: IMarkdownDocument, tagType: string, visitor: IVisitor);
}
declare class ParagraphHandler extends Handler<ParseElement> {
    private readonly document;
    private readonly visitable;
    private readonly visitor;
    protected CanHandle(request: ParseElement): boolean;
    constructor(document: IMarkdownDocument);
}
declare class Header1ChainHandler extends ParseChainHandler {
    constructor(document: IMarkdownDocument);
}
declare class Header2ChainHandler extends ParseChainHandler {
    constructor(document: IMarkdownDocument);
}
declare class Header3ChainHandler extends ParseChainHandler {
    constructor(document: IMarkdownDocument);
}
declare class HorizontalRuleHandler extends ParseChainHandler {
    constructor(document: IMarkdownDocument);
}
declare class ChainOfResponsibilityFactory {
    Build(document: IMarkdownDocument): ParseChainHandler;
}
/**takes the text that the user is typing in and splits it into individual lines,
 and creates our ParseElement,chain-of-responsibility handlers, and MarkdownDocument instance.
 Each line is then forwarded to Header1ChainHandler to start the processing of the line.
Finally, we get the text from the document and return it so that we can
display it in the label */
declare class Markdown {
    ToHtml(text: string): string;
}
