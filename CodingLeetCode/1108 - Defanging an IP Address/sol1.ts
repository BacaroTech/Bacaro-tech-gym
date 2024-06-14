function defangIPaddr(address: string): string {
    let singlePieces: string[] = address.split('.');
    return singlePieces[0] + "[.]" + singlePieces[1] + "[.]" + singlePieces[2] + "[.]" + singlePieces[3];
};