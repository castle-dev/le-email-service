import Promise from 'ts-promise';
export interface LeEmailService {
  sendTemplate(to:string, slug:string, data:Object, replyTo?:string, subject?:string): Promise<any>;
  sendHtml(to:string, subject:string, htmlBody:string, replyTo?:string, threadID?:string): Promise<any>;
}
export default LeEmailService;
