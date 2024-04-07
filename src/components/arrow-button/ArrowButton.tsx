import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
import clsx from 'clsx';
import { useEffect, useRef } from 'react';

/** Функция для обработки открытия/закрытия формы */
export type TOnClick = (event:KeyboardEvent|MouseEvent) => void;

export const ArrowButton = (props:{open?:boolean|null, onClick?:TOnClick}) => {
	const open=props.open?props.open:false;
	const divRef= useRef<HTMLDivElement|null>(null);
	useEffect(()=>{
		props.onClick?divRef.current?.addEventListener('click',props.onClick):undefined;
		props.onClick?divRef.current?.addEventListener('keydown',props.onClick):undefined;
		return ()=> {
			props.onClick?divRef.current?.removeEventListener('click',props.onClick):undefined;
			props.onClick?divRef.current?.removeEventListener('keydown',props.onClick):undefined;
		}
	},[]);
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div ref={divRef}
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx({[styles.container]:true, [styles.containerOpen]:open})}>
			<img src={arrow} alt='иконка стрелочки' className={clsx({[styles.arrow]:true,[styles.arrowOpen]:open})} />
		</div>
	);
};
