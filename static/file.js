const API = axios.create({
    baseURL: 'http://localhost:8001/api',
    timeout: 30000
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
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        const files = $('#file').prop('files');

        API.get(`/posts/${post_id}/filenum`)
            .then(res => {
                const filenum = res.data.filenum
                console.log('count ', filenum + files.length);
                if (filenum + files.length < 6) {
                    const promises = []

                    for (let i = 0; i < files.length; i++) {
                        const formData = new FormData();
                        formData.append('file', files[i])
                        promises.push(API.patch(`/posts/${post_id}/file`, formData, config))
                    }

                    Promise.all(promises)
                        .then(doc => {
                            console.log(doc);
                            location.reload();
                        })
                        .catch(err => {
                            console.error(err);
                        })
                } else {
                    console.log("can't upload over 5 files");
                }
            })
            .catch(err => {
                console.log(err);
            })
    })

    //del file
    $('#delFile').on('click', () => {
        const promises = []

        let fileID = [];
        $(':checkbox:checked').each(function (i) {
            fileID[i] = $(this).val();
        });

        for (let i = 0; i < fileID.length; i++) {
            promises.push(API.delete(`/posts/${post_id}/file`, {
                data: {
                    fileID: fileID[i]
                }
            }))
        }

        Promise.all(promises)
            .then(doc => {
                console.log(doc);
                location.reload();
            })
            .catch(err => {
                console.error(err);
            })
    })
})