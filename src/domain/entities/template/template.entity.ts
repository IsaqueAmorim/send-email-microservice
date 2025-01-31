import QueryTemplateDto from './query-template.dto';

export class Template {
  private constructor(name: string, html: string) {
    this.name = name;
    this.html = html;
    this.validade();
  }

  static newTemplate(name: string, html: string): Template {
    return new Template(name, html);
  }

  static convertQueryToTemplate(query: QueryTemplateDto): Template {
    const template = new Template(query.name, query.html);
    template.id = query.id;
    return template;
  }

  private validade() {
    if (!this.name.trim()) {
      throw new Error('Invalid name');
    }

    if (!this.html.trim()) {
      throw new Error('Invalid variables');
    }
  }

  private id: string;
  private name: string;
  private html: string;

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
    this.validade();
  }

  public getHtml(): string {
    return this.html;
  }

  public setHtml(html: string): void {
    this.html = html;
    this.validade();
  }
}
