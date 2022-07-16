export const PlaceCloneEndpoints = [
    {
        uri:"/api/pixels",
        method:"GET",
        description:"Get Pixel Data",
    },
    {
        uri:"/api/updatePixel",
        method:"POST",
        description:"Update a pixel",
        args:[
            {
                name:"row",
                description:"required,integer",
                type:"integer",
            },
            {
                name:"col",
                description:"required,integer",
                type:"integer",
            },
            {
                name:"color",
                description:"required,string",
                type:"string",
            },
        ]
    }
]