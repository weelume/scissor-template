'use client'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'

interface SelectOption { value: string; label: string }
interface FormSelectProps {
  name: string
  label: string
  placeholder: string
  options: readonly SelectOption[]
  required?: boolean
  validationMessage: string
  onValueChange?: () => void
}

/** 选择层与原生约束验证分工：弹出层负责交互，隐藏的 select 保留表单语义。 */
export function FormSelect({ name, label, placeholder, options, required = false, validationMessage, onValueChange }: FormSelectProps) {
  const id = useId(), wrapper = useRef<HTMLDivElement>(null), trigger = useRef<HTMLButtonElement>(null)
  const [open, setOpen] = useState(false), [value, setValue] = useState(''), [highlight, setHighlight] = useState(0), [invalid, setInvalid] = useState(false)
  const reduced = useReducedMotion()
  const selected = options.find(option => option.value === value)
  useEffect(() => {
    if (!open) return
    const closeOutside = (event: PointerEvent): void => {
      if (event.target instanceof Node && !wrapper.current?.contains(event.target)) setOpen(false)
    }
    document.addEventListener('pointerdown', closeOutside)
    return () => document.removeEventListener('pointerdown', closeOutside)
  }, [open])
  const choose = (next: string): void => {
    setValue(next); setOpen(false); setInvalid(false); onValueChange?.(); trigger.current?.focus()
    console.debug('[scissor:select]', { field: name, option: next })
  }
  const expand = (): void => {
    const index = options.findIndex(option => option.value === value)
    setHighlight(index < 0 ? 0 : index); setOpen(true)
  }
  const handleKey = (event: KeyboardEvent<HTMLButtonElement>): void => {
    if (!options.length) return
    if (event.key === 'Escape') { setOpen(false); return }
    if (event.key === 'Tab') { setOpen(false); return }
    if (['ArrowDown', 'ArrowUp', 'Home', 'End', 'Enter', ' '].includes(event.key)) {
      event.preventDefault()
      if (!open) { expand(); return }
      if (event.key === 'Enter' || event.key === ' ') { const option = options[highlight]; if (option) choose(option.value); return }
      setHighlight(index => event.key === 'Home' ? 0 : event.key === 'End' ? options.length - 1 : (index + (event.key === 'ArrowDown' ? 1 : -1) + options.length) % options.length)
    }
  }
  return <div className="sc-select" ref={wrapper}>
    <span id={id + '-label'} className="sc-select-label">{label}</span>
    <select className="sc-select-native" name={name} required={required} value={value} aria-hidden="true" tabIndex={-1}
      onChange={event => choose(event.target.value)}
      onInvalid={event => { event.preventDefault(); setInvalid(true); trigger.current?.focus() }}>
      {required && <option value="" disabled>{placeholder}</option>}
      {options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
    </select>
    <button ref={trigger} className="sc-select-trigger" type="button" role="combobox" aria-haspopup="listbox"
      aria-labelledby={id + '-label'} aria-controls={id + '-options'} aria-expanded={open} aria-required={required}
      aria-activedescendant={open ? id + '-option-' + highlight : undefined} aria-invalid={invalid}
      aria-describedby={invalid ? id + '-error' : undefined} disabled={options.length === 0}
      onKeyDown={handleKey} onClick={() => open ? setOpen(false) : expand()}>
      <span>{selected?.label ?? placeholder}</span><i aria-hidden="true"/>
    </button>
    <AnimatePresence>{open && <motion.ul id={id + '-options'} className="sc-select-panel" role="listbox" aria-labelledby={id + '-label'}
      initial={reduced ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }} transition={{ duration: reduced ? 0 : .15, ease: 'easeOut' }}>
      {options.map((option, index) => <li key={option.value} id={id + '-option-' + index} role="option" aria-selected={value === option.value}
        data-highlighted={highlight === index} onPointerEnter={() => setHighlight(index)} onPointerDown={event => event.preventDefault()} onClick={() => choose(option.value)}>{option.label}</li>)}
    </motion.ul>}</AnimatePresence>
    <AnimatePresence>{invalid && <motion.p id={id + '-error'} className="sc-select-error" role="alert" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reduced ? 0 : .2 }}>{validationMessage}</motion.p>}</AnimatePresence>
  </div>
}
