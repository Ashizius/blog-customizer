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
import {
	AllStatesListType,
	ArticleStateType,
	OptionType,
} from 'src/constants/articleProps';
import { Select } from '../select';
import { Text } from '../text';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { useClose } from './hooks/useClose';

export type TSetOptions = (options: ArticleStateType) => void;

export type TArticleParamsFormProps = {
	onApply: TSetOptions;
	defaultOption: ArticleStateType;
	allOptions: AllStatesListType;
};

export const ArticleParamsForm = (props: TArticleParamsFormProps) => {
	const { onApply, defaultOption, allOptions } = props;
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const [articleOption, setArticleOption] =
		useState<ArticleStateType>(defaultOption);
	const menuRef = useRef<HTMLElement | null>(null); //ссылка на элемент по которыму не срабатывает закрытие меню

	useClose(
		{
			onClose: () => {
				setIsMenuOpen(false);
			},
			rootRef: menuRef,
		},
		isMenuOpen
	);

	const toggleForm = useCallback((e: KeyboardEvent | MouseEvent) => {
		if (e.currentTarget !== document) {
			const key = e instanceof KeyboardEvent ? e.key : undefined;
			if (key === ' ' || key === 'Enter' || e.type === 'click') {
				setIsMenuOpen((open: boolean) => !open);
			}
		}
	}, []);

	const changeOption = (name: keyof ArticleStateType, option: OptionType) => {
		setArticleOption((articleOption: ArticleStateType) => {
			const newArticleState = { ...articleOption, [name]: option };
			return newArticleState;
		});
	};

	const submit = (e?: SyntheticEvent) => {
		e?.preventDefault();
		onApply({ ...articleOption });
		setIsMenuOpen(false); //закрывает меню при нажатии, если убрать, то не будет
	};

	const reset = (e?: SyntheticEvent) => {
		e?.preventDefault();
		onApply({ ...defaultOption });
		setArticleOption({ ...defaultOption });
		setIsMenuOpen(false); //закрывает меню при нажатии, если убрать, то не будет
	};

	return (
		<>
			<ArrowButton open={isMenuOpen} onClick={toggleForm} />

			<aside
				className={clsx({
					[styles.container]: true,
					[styles.containerOpen]: isMenuOpen,
				})}
				ref={menuRef}>

				<form className={styles.form} onSubmit={submit}>
					<Text as='h2' weight={800} size={31} family='open-sans' align='left'>
						ЗАДАЙТЕ ПАРАМЕТРЫ
					</Text>

					<Select
						title={'шрифт'}
						options={allOptions.fontFamilyOptions}
						selected={articleOption.fontFamilyOption}
						placeholder={articleOption.fontFamilyOption.title}
						onChange={(option: OptionType) => {
							changeOption('fontFamilyOption', option);
						}}
					/>

					<RadioGroup
						title={'размер шрифта'}
						options={allOptions.fontSizeOptions}
						selected={articleOption.fontSizeOption}
						onChange={(option: OptionType) => {
							changeOption('fontSizeOption', option);
						}}
						name={'fontSizeOption'}
					/>

					<Select
						title={'цвет шрифта'}
						options={allOptions.fontColors}
						selected={articleOption.fontColor}
						placeholder={articleOption.fontColor.title}
						onChange={(option: OptionType) => {
							changeOption('fontColor', option);
						}}
					/>

					<Separator />

					<Select
						title={'цвет фона'}
						options={allOptions.backgroundColors}
						selected={articleOption.backgroundColor}
						placeholder={articleOption.backgroundColor.title}
						onChange={(option: OptionType) => {
							changeOption('backgroundColor', option);
						}}
					/>

					<Select
						title={'ширина контента'}
						options={allOptions.contentWidthArr}
						selected={articleOption.contentWidth}
						placeholder={articleOption.contentWidth.title}
						onChange={(option: OptionType) => {
							changeOption('contentWidth', option);
						}}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={reset} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
