export class ReplyDto {

    readonly parent_id: string;


    readonly reply_id: string;

    //评论或者回复

    readonly reply_type: string;


    readonly body: string;

    //回复用户的id

    readonly from_uid: string


    readonly to_uid: string
}