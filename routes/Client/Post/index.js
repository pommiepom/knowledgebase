const express = require('express')
const router = express.Router()

const Post = require('../../../controllers/Post')

router.get('/', (req, res) => {
	res.writeHead(200, {'Content-Type': 'text/html'})
	res.end(`
	<form action="/api/posts" method="post" enctype="multipart/form-data">
		CreatedBy:<br>
		<input id="createdBy" name="createdBy" type="text"><br>
		Title:<br>
		<input id="title" name="title" type="text"><br>
		Detail:<br>
		<textarea id="detail" name="detail" type="text"></textarea><br>
		Category:<br>
		<select class="form-control-sm" id="category" name="category">
			<option value="internet">General > Internet</option>
			<option value="print">General > Printer</option>
			<option value="pro">General > Projector</option>
		</select><br>Attachment:<br>
		<input id="fileID" name="file" type="file" multiple="multiple"><br><br><br>
		<input type="submit" value="NEW POST">
	</form>`)
})

router.get('/:_id/files', (req, res) => {
	res.writeHead(200, { 'Content-Type': 'text/html' });
	Post.list(req.params)
		.then(doc => {
			const file = doc[0].fileID

			res.write(`
			<form action="/api/posts/${req.params._id}/files/add" method="post" enctype="multipart/form-data">
				Attachment:<br><br>
				<input id="fileID" type="file" name="file" multiple="multiple" /><br>
				<input type="submit" value="ADD">
			</form><br>
			`);

			res.write(`
			<form action="/api/posts/${req.params._id}/files/del" method="post">`);
			for (let i = 0; i < file.length; i++) {
				res.write(`
				<input type="checkbox" name="file" value=${String(file[i])}>${file[i]}<br>`)
			}
			res.end(`<input type="submit" value="DELETE">
			</form>`);
		})
		.catch(err => {
			console.error(err)
			res.status(500).json(err)
		})
})

module.exports = router

			
