
interface ResponseEntity {
    statusCode : number,
    Message : string,
    Error : string | null,
    Data : string | null
}

export default ResponseEntity
