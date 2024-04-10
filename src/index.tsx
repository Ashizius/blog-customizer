import { createRoot } from 'react-dom/client';
import {
	StrictMode,
	CSSProperties,
	useState,
	useRef,
	SyntheticEvent,
} from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	allStatesList,
	ArticleStateType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';
import { ArticleParams } from './components/article-params-form/ArticleParams';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [articleState, setArticleState] = useState(defaultArticleState);
	const articleOptions = useRef({ ...defaultArticleState }); //чтобы не перерендеривалась страница при каждой смене настроек до применения.
	const setArticleOptions = (options: ArticleStateType) => {
		articleOptions.current = options;
	};
	const submit = (e?: SyntheticEvent) => {
		e?.preventDefault();
		setArticleState({ ...articleOptions.current });
	};
	const reset = (e?: SyntheticEvent) => {
		e?.preventDefault();
		articleOptions.current = { ...defaultArticleState };
		setArticleState({ ...defaultArticleState });
	};

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onSubmit={submit} onReset={reset}>
				<ArticleParams
					current={articleOptions.current}
					onChange={setArticleOptions}
					all={allStatesList}
				/>
			</ArticleParamsForm>
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
