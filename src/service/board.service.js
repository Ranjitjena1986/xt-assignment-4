export class BoardService {

    getBoards(id) {
        let promise = new Promise((resolve, reject) => {
            fetch("http://localhost:3004/boards/"+id, {
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

    addBoard(obj) {
        let promise = new Promise((resolve, reject) => {
            fetch("http://localhost:3004/boards/", {
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache'
                },
                method: 'POST',
                body: JSON.stringify(obj)               
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

    deleteBoard(id) {
        let promise = new Promise((resolve, reject) => {
            fetch("http://localhost:3004/boards/"+id, {
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache'
                },
                method: 'DELETE'
                         
            }).then(res => {
                resolve(res);
            }, error => {
                reject(new ResponseError('Service Error' + error.message));
            })
        });
        return promise;
    }

    updateBoard(id,obj) {
        let promise = new Promise((resolve, reject) => {
            fetch("http://localhost:3004/boards/"+id, {
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache'
                },
                method: 'PUT',
                body: JSON.stringify(obj)               
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