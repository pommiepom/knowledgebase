const API = axios.create({
    baseURL: 'http://localhost:8001/api'
})

$(function () {
    const url = new URL(window.location.href);
    const search_params = new URLSearchParams(url.search);
    const post_id = search_params.get('post_id');

    // list file for del
    API.get(`/posts/${post_id}/files`)
        .then(fileID => {
            let x = "";
            if (fileID.data.length == 0) {
                $('#loopFile').html("file is empty")
            } else {
                for (let i = 0; i < fileID.data.length; i++) {
                    x = x + `<input name="fileID" type="checkbox" value="${fileID.data[i]}">${fileID.data[i]}<br>`
                }
                $('#loopFile').html(x)
            }
        })

    // add file
    $('#addFile').on('click', () => {
        addFile(post_id)
    })

    //del file
    $('#delFile').on('click', () => {
        const promises = []
        let fileID = [];

        $(':checkbox:checked').each(function (i) {
            fileID[i] = $(this).val();
        });

        if (fileID.length > 0) {
            for (let i = 0; i < fileID.length; i++) {
                promises.push(API.delete(`/posts/${post_id}/file`, {
                    data: {
                        fileID: fileID[i]
                    }
                }))
            }

            Promise.all(promises.map(Reflect))
                .then(doc => {
                    console.log(doc);
                })
                .catch(err => {
                    console.error(err);
                })
        }
    })
})