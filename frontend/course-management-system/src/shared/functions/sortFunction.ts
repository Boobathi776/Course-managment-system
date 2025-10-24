
export const sort = <T>(items:T[],key : keyof T | null ,order : "asc" | "desc" = "asc")=>
{
    if(key===null) return items;

    return [...items].sort((a,b)=>{

        if(typeof a[key]==="number" && typeof b[key]==="number")
        {
            return order==="asc" ? a[key]-b[key] : b[key]-a[key];
        }

        if(typeof a[key]==="string" && typeof b[key]==="string")
        {
            return order==="asc" ? (a[key] as string).localeCompare(b[key] as string) : ( b[key] as string).localeCompare(a[key]);
        }

        if( a[key] instanceof Date && b[key] instanceof Date)
        {
            return order==="asc" ? new Date(a[key]).getTime() - new Date(b[key]).getTime() :
            new Date(b[key]).getTime() - new Date(a[key]).getTime();
        }

        else return 0;
    });
}