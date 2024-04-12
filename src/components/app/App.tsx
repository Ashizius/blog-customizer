import { CSSProperties, useState } from 'react';
import clsx from 'clsx';

import styles from '../../styles/index.module.scss';
import {
	ArticleStateType,
	allStatesList,
	defaultArticleState,
} from 'src/constants/articleProps';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { Article } from '../article/Article';

export const App = () => {
	const [articleState, setArticleState] = useState(defaultArticleState);

	const changeOptions = (options: ArticleStateType) => {
		setArticleState({ ...options });
	};

	return (
		<>
			<ArticleParamsForm
				onApply={changeOptions}
				defaultOption={{ ...defaultArticleState }}
				allOptions={allStatesList}
			/>
			<main
				className={styles.main}
				style={
					{
						'--font-family': articleState.fontFamilyOption.value,
						'--font-size': articleState.fontSizeOption.value,
						'--font-color': articleState.fontColor.value,
						'--container-width': articleState.contentWidth.value,
						'--bg-color': articleState.backgroundColor.value,
					} as CSSProperties
				}>
				<Article />
			</main>
		</>
	);
};
