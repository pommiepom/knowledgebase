const API = axios.create({
    baseURL: 'http://localhost:8001/api'

})

$(function () {

    $('#newPost').on('click', function () {
        const formData = new FormData($('form')[0]);
        let data = {};

        for (const [key, value] of formData.entries()) {
            data[key] = value;
        }

        API.post('/posts', data)
            .then(doc => {
                console.log(doc);
                const postID = doc.data._id
                window.location = "/public/newFile.html?post_id=" + postID
                // window.location = "/public/post/" + postID + "/file"
            })
            .catch(err => {
                console.log(err);
            })

    })
})