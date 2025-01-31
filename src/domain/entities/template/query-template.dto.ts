export default class QueryTemplateDto {
  constructor(
    id: string,
    name: string,
    html: string,
    created_at: Date,
    updated_at: Date,
  ) {
    this.id = id;
    this.name = name;
    this.html = html;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  id: string;
  name: string;
  html: string;
  created_at: Date;
  updated_at: Date;
}
