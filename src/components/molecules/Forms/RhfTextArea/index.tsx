import { DeepMap, FieldError, FieldValues, useController, UseControllerProps } from 'react-hook-form'
import { Textarea, TextareaProps } from '@/components/atoms/Forms/Textarea'

export type RhfTextAreaProps<T extends FieldValues> = TextareaProps & UseControllerProps<T>

// NOTE：react-hook-formのTextareaラッパー
export const RhfTextArea = <T extends FieldValues>(props: RhfTextAreaProps<T>) => {
  const { name, control, placeholder, className, min, max } = props
  const {
    field: { ref, ...rest },
    formState: { errors },
  } = useController<T>({ name, control })

  return (
    <Textarea
      inputRef={ref}
      placeholder={placeholder}
      className={className}
      min={min}
      max={max}
      {...rest}
      error={errors[name] && `${(errors[name] as DeepMap<FieldValues, FieldError>).message}`}
    />
  )
}
