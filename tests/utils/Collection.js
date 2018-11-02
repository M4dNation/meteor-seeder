export class Collection
{
    constructor(collectionName) 
    {
        this._driver = 
        {
            mongo: {},
        };
    
        this._name = collectionName || 'collection';
        this._data = [];
    }
    
    find() 
    {
        return {
            count: (() => this._data.length),
        };
    }
    
    findOne() 
    {
        return this._data[0];
    }
    
    insert(data) 
    {
        const documentId = uuid();
        this._data.push({ _id: documentId, ...data });
        return documentId;
    }
    
    remove() 
    {
        this._data = [];
    }
}