import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import {
	PropsWithChildren,
	SyntheticEvent,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';



type TEventFunction = (e?: SyntheticEvent) => void;
export type TArticleParamsFormProps = {
	onSubmit?: TEventFunction;
	onReset?: TEventFunction;
};

export const ArticleParamsForm = (
	props: PropsWithChildren<TArticleParamsFormProps>
) => {
	const [open, setOpen] = useState<boolean | null>(null);
	const menuRef = useRef<Set<EventTarget | null>>(new Set()); //список элементов по которым не срабатывает закрытие меню
	const pushRef = (element: EventTarget | null) => {
		if (element) {
			menuRef.current.add(element);
		}
	};
	const closeForm = useCallback((e: KeyboardEvent|MouseEvent) => {
		const key=(e instanceof KeyboardEvent)?e.key:undefined;
		if (((!menuRef.current.has(e.target))&&(key===undefined))||(key==='Escape')) {
			setOpen(false);
		}
	}, []);

	const toggleForm = useCallback((e: KeyboardEvent|MouseEvent) => {
		if (e.currentTarget !== document) {
			const key=(e instanceof KeyboardEvent)?e.key:undefined;
			if ((key===' ')||(key==='Enter')||(e.type === 'click')){
				setOpen((open) => !open);
				pushRef(e.target);
			}
		}
	}, []);

	useEffect(() => {
		if (open !== null) {
			if (open) {
				document.addEventListener('click', closeForm);
				document.addEventListener('keydown', closeForm);
			} else {
				document.removeEventListener('click', closeForm);
				document.removeEventListener('keydown', closeForm);
			}
		}
	}, [open]);
	const submit = (e?:SyntheticEvent) => {
		props.onSubmit?.(e);
		setOpen(false);
	}
	const reset = (e?:SyntheticEvent) => {
		props.onReset?.(e);
		setOpen(false);
	}
	return (
		<>
			<ArrowButton open={open} onClick={toggleForm} />
			<aside
				className={clsx({
					[styles.container]: true,
					[styles.containerOpen]: open,
				})}
				onClick={
					(e) => pushRef(e.target) /* добавляет элемент в список исключений закрытия меню */
				}>
				<form className={styles.form} onSubmit={submit}>
					{props?.children}
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={reset} />
						<Button title='Применить' type='submit'/>
					</div>
				</form>
			</aside>
		</>
	);
};
//onClick={apply}