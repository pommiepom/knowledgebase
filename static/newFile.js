const API = axios.create({
    baseURL: 'http://localhost:8001/api',
    timeout: 30000
})

$(function () {

    $('#newFile').on('click', function () {
        const url = new URL(window.location.href);
        const search_params = new URLSearchParams(url.search);
        const post_id = search_params.get('post_id');

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };

        const files = $('#file').prop('files');
        console.log(files);
        const promises = []
        for (let i = 0; i < files.length; i++) {
            const formData = new FormData();

            formData.append('file', files[i])
            // promises.push(API.post(`/posts/${post_id}/file`, formData, config))
            API.patch(`/posts/${post_id}/file`, formData, config)
            .then(doc => {
                console.log(doc);
            })
            .catch(err => {
                console.log(err);
            })
        }

        // Promise.all(promises)
        //     .then(doc => {
        //         console.log(doc);
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     })
    })
})