export interface ITextareaProps {
    className?: string,
    modelValue?: string,
    onInput?: (event: Event) => void,
    onPressEnter?: (event: KeyboardEvent) => void,
    disabled?: boolean,
}