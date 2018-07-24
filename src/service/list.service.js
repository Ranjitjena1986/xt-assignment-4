export class ListService{
    
    getList(id){
        let promise = new Promise((resolve, reject) => {
            fetch("http://localhost:3004/lists/"+id, {
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache'
                },
                method: 'get'               
            }).then(
                res => res.json()
            ).then(json => {
                resolve(json);
            }, error => {
                reject(new ResponseError('Service Error' + error.message));
            })
        });
        return promise;
    }
}