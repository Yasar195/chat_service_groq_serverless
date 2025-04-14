export type chatInput = {
    message: String
}

export type responsetype<T> = {
   status: number
   success: boolean,
   message: String,
   data: T,
   error: String|null
}

export type replyDto = {
    reply: String
}