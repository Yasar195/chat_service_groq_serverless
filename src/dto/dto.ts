export type chatInput = {
    message: String
}

export type responsetype<T> = {
   success: boolean,
   message: String,
   data: T,
   error: String|null
}