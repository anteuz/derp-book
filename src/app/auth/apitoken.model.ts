export class ApiToken {
  public access_token: string;
  public expires_in: number;

  constructor(access_token: string, expires_in: number) {
    this.access_token = access_token;
    this.expires_in = expires_in;
  }
}
