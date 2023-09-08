export const handleChange = (e, state, setState) => {
    let _state = { ...state }
    _state[e.target.name] = e.target.value
    setState(_state)
}
export function isEmptyString(str) {
    return (str === undefined || str == null || str === '' || str === '?' || str.length === 0);
}