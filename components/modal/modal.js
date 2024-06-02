
function ModalTemplate() {
    return `
<dialog aria-hidden="true" aria-labelledby="modal_title" class="modal" id="modal" role="alertdialog" style="display:none;">
	<div class="modal_container">
        <h2 class="modal_title" id="modal_title"></h2>
        <div class="modal_content" id="modal_content"></div>
        <button class="modal_btn_close" id="modal_btn_close">&cross;</button>
	</div>
</dialog>
    `;
}


export function create_modal_context() {
    document.body.insertAdjacentHTML('beforeend', ModalTemplate());

    const modal = document.getElementById('modal');
    const modal_title = document.getElementById('modal_title');
    const modal_content = document.getElementById('modal_content');
    const modal_btn_close = document.getElementById('modal_btn_close');
    modal_btn_close.addEventListener('click', close);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            close();
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            close();
        }
    });

    function open(title, content) {
        modal_title.textContent = title;
        modal_content.innerHTML = content;
        modal.attributes.ariaHidden = false;
        modal.showModal();
        modal.style.display = 'flex';
        document.querySelector('.modal [tabindex]').focus();
    }

    function close() {
        modal.attributes.ariaHidden = true;
        modal.close();
        modal.style.display = 'none';
    }

    return {open, close}
}
