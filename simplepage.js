function createElement({ title, image, description, download }, innerHtml) {

    return html`
    <div class="page">
		<div class="left">
			${!title        ? '' : html`<h1>${title}</h1>`}
			${!description  ? '' : html`<div class="description">${description}</div>`}
		</div>
		<div class="right">
			${!image        ? '' : html`<img class="image" src="${image}">`}
			${!download     ? '' : html`<a href="${download}" class="link">Download</a>`}
		</div>
		${!innerHtml    ? '' : innerHtml}
    </div>`
}