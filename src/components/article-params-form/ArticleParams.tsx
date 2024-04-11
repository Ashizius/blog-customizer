import { useEffect, useState } from 'react';
import {
	ArticleStateType,
	AllStatesListType,
	OptionType,
} from '../../constants/articleProps';
import { RadioGroup } from '../radio-group';
import { Select } from '../select';
import { Separator } from '../separator';

type TFullParameters = {
	onChange: (articleState: ArticleStateType) => void;
	current: ArticleStateType;
	all: AllStatesListType;
};

const isSimilar = (option1: ArticleStateType, option2: ArticleStateType) => {
	return (Object.keys(option1) as (keyof ArticleStateType)[]).every((key) => {
		return option1[key].value === option2[key].value;
	});
};

export const ArticleParams = (props: TFullParameters) => {
	const [articleOptions, setArticleOptions] = useState(props.current);
	const { onChange, current, all } = props;
// задан отдельным компонентом, чтобы можно было разделить контейнер настроек и сами настройки
	useEffect(() => {
		!isSimilar(current, articleOptions)
			? setArticleOptions({ ...current })
			: undefined;
	}, [props.current]);

	const changeOption = (name: keyof ArticleStateType, option: OptionType) => {
		setArticleOptions((articleOptions) => {
			const newArticleState = { ...articleOptions, [name]: option };
			onChange(newArticleState);
			return newArticleState;
		});
	};

	return (
		<>
			<Select
				title={'шрифт'}
				options={all.fontFamilyOptions}
				selected={articleOptions.fontFamilyOption}
				placeholder={articleOptions.fontFamilyOption.title}
				onChange={(option: OptionType) => {
					changeOption('fontFamilyOption', option);
				}}
			/>
			<RadioGroup
				title={'размер шрифта'}
				options={all.fontSizeOptions}
				selected={articleOptions.fontSizeOption}
				onChange={(option: OptionType) => {
					changeOption('fontSizeOption', option);
				}}
				name={'fontSizeOption'}
			/>
			<Select
				title={'цвет шрифта'}
				options={all.fontColors}
				selected={articleOptions.fontColor}
				placeholder={articleOptions.fontColor.title}
				onChange={(option: OptionType) => {
					changeOption('fontColor', option);
				}}
			/>
			<Separator />
			<Select
				title={'цвет фона'}
				options={all.backgroundColors}
				selected={articleOptions.backgroundColor}
				placeholder={articleOptions.backgroundColor.title}
				onChange={(option: OptionType) => {
					changeOption('backgroundColor', option);
				}}
			/>
			<Select
				title={'ширина контента'}
				options={all.contentWidthArr}
				selected={articleOptions.contentWidth}
				placeholder={articleOptions.contentWidth.title}
				onChange={(option: OptionType) => {
					changeOption('contentWidth', option);
				}}
			/>
		</>
	);
};
