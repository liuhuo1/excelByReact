import React from 'react';

interface commentListProps {
	text: string;
};
export class CommentList extends React.Component<commentListProps> {
	constructor(props: commentListProps) {
		super(props);
	}
	render() {
		const { text } = this.props;
		return (
			<div>
				{text}
			</div>
		);
	}
}

interface blogPostProps {
	value: string
}
export class BlogPost extends React.Component<blogPostProps> {
	constructor(props: blogPostProps) {
		super(props);
	}
	render() {
		const { value } = this.props;
		return (
			<div>
				{value}
			</div>
		)
	}
}

interface withSubscriptionProps {
	text?: string;
	value?: string;
}

export function withSubscription(WrappedComponent: any, selectData: object) {
	return class extends React.Component<withSubscriptionProps> {
		constructor(props: withSubscriptionProps) {
			super(props);
		}

		render() {
			return <WrappedComponent {...this.props} {...selectData} />;
		}
	};
}
