export default ResponseData = {
    code: number,
    message: string,
    ok: boolean
}

export interface BrandExistFiled {
    id?: number,
    tmName: string,
    logoUrl: string
}

export type Records = BrandExistFiled[]

export interface BrandFiled extends ResponseData {
    data: {
        records: Records,
        total: number,
        size: number,
        current: number,
        searchCount: boolean,
        pages: number
    }
}