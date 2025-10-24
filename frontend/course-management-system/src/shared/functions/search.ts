export const search = <T>(items:T[],key:keyof T,keyword:string)=>{
    if(typeof items[0][key] !== "string") return items;

    return [...items].filter(item=>(item[key] as string).toLocaleLowerCase().includes(keyword.toLocaleLowerCase()));
};