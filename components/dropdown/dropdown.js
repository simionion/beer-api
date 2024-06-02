
export function create_order_dropdown(order_options) {
    const dropdown = document.createElement('div');
    dropdown.className = 'dropdown';
    dropdown.tabIndex = 0;

    const dropbtn = document.createElement('button');
    dropbtn.className = 'dropbtn';
    dropbtn.innerHTML = 'Order &#9660;';
    dropbtn.tabIndex = 0;
    dropdown.appendChild(dropbtn);



    const dropdownContent = document.createElement('div');
    dropdownContent.className = 'dropdown-content';

    order_options.forEach((item) => {
        const dropdownItem = document.createElement('div');
        dropdownItem.className = 'dropdown-item';
        dropdownItem.tabIndex = 0;

        const itemLabel = document.createElement('span');
        itemLabel.textContent = item.name;
        itemLabel.tabIndex = 0;
        dropdownItem.appendChild(itemLabel);

        const submenu = document.createElement('div');
        submenu.className = 'dropdown-submenu';

        for (let i = 1; i <= item.qty; i++) {
            const subItem = document.createElement('a');
            subItem.href = '#';
            subItem.textContent = i;
            subItem.tabIndex = 0;
            submenu.appendChild(subItem);
        }

        dropdownItem.appendChild(submenu);
        dropdownContent.appendChild(dropdownItem);
    });

    dropdown.appendChild(dropdownContent);
    return dropdown.outerHTML;
}
