function removeVietnameseTones(str: string): string {
    str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // loại dấu
    str = str.replace(/đ/g, "d").replace(/Đ/g, "D"); // đ → d
    return str;
}

export default removeVietnameseTones;