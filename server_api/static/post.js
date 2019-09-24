const API = axios.create({
    baseURL: 'http://localhost:8001/api'

})

$(function () {

    $('#newPost').on('click', function () {
        const files = $('#file').prop('files');
        if (files.length < 6) {
            const formData = new FormData($('form')[0]);
            let data = {};

            for (const [key, value] of formData.entries()) {
                data[key] = value;
            }

            API.post('/posts', data)
                .then(doc => {
                    const postID = doc.data._id
                    console.log(doc.data);
                    addFile(postID)
                    // window.location = "/public/file.html?post_id=" + postID
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            console.log("can't upload over 5 files");
        }
    })
})