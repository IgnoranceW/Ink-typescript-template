<h1 align="center">
	<br>
	<br>
	<img width="200" alt="Ink" src="media/logo.png">
	<br>
	<br>
	<br>
</h1>

> 用 `React` 书写CLI. 使用组件构建和测试你的CLI工具.

[![Build Status](https://github.com/vadimdemedes/ink/workflows/test/badge.svg)](https://github.com/vadimdemedes/ink/actions)
[![npm](https://img.shields.io/npm/dm/ink?logo=npm)](https://npmjs.com/package/ink)

`Ink` 提供了与在浏览器中使用 `React` 一样的基于组件构建UI的开发体验。
`Ink` 使用了 [Yoga](https://github.com/facebook/yoga) 在终端中搭建 `FLexbox` 布局, 所以大部分 `CSS-like` 的参数在 `Ink` 中也能使用。
如果你对 `React` 熟悉，那你也应该了解如何使用 `Ink` 。

`Ink` 一 `React` 染器，意味着所 `React` 功能都能够支持。
请前往 [React](https://reactjs.org) 的官方网站查看使用它的文档。
只 `Ink` 方法会在本 Readme 中被提及。

**注意：** 这 `Ink3` 文档。 如果你在寻 `Ink2` 文档, 请查看 [这个版本](https://github.com/vadimdemedes/ink/tree/v2.7.1)。 同时，`Ink2` 到 `Ink3`的 [迁移指南](migrate.md) 请查看这里。

## 安装

```
$ npm install ink react
```

## 用例

```jsx
import React, {useState, useEffect} from 'react';
import {render, Text} from 'ink';

const Counter = () => {
	const [counter, setCounter] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setCounter(previousCounter => previousCounter + 1);
		}, 100);

		return () => {
			clearInterval(timer);
		};
	}, []);

	return <Text color="green">{counter} tests passed</Text>;
};

render(<Counter />);
```

<img src="media/demo.svg" width="600">

你也可以在 [这里](https://ink-counter-demo.vadimdemedes.repl.run/) 实时查看。
随意尝试更改代码，并可以在 [这里](https://repl.it/@vadimdemedes/ink-counter-demo) 获得 `fork` 分支。

## 谁在使用Ink?

- [Gatsby](https://www.gatsbyjs.org) - Gatsby is a modern web framework for blazing fast websites.
- [Parcel](https://parceljs.org) - Blazing fast, zero configuration web application bundler.
- [tap](https://node-tap.org) - A Test-Anything-Protocol library for JavaScript.
- [Yarn 2](https://yarnpkg.com) - Fast, reliable, and secure dependency management for JavaScript.
- [Terraform CDK](https://github.com/hashicorp/terraform-cdk) - CDK (Cloud Development Kit) for HashiCorp Terraform.
- [Typewriter](https://github.com/segmentio/typewriter) - Generates strongly-typed [Segment](https://segment.com) analytics clients from arbitrary JSON Schema.
- [Prisma](https://www.prisma.io) - The unified data layer for modern applications.
- [Wallace](https://www.projectwallace.com) - Pretty CSS analytics on the CLI.
- [Blitz](https://blitzjs.com) - The Fullstack React Framework.
- [New York Times](https://github.com/nytimes/kyt) - NYT uses Ink `kyt` - a toolkit that encapsulates and manages the configuration for web apps.
- [tink](https://github.com/npm/tink) - Next-generation runtime and package manager.
- [loki](https://github.com/oblador/loki) - Visual Regression Testing for Storybook.
- [Bit](https://github.com/teambit/bit) - Build, distribute and collaborate on components.
- [Remirror](https://github.com/remirror/remirror) - Your friendly, world-class editor toolkit.
- [Prime](https://github.com/birkir/prime) - Open source GraphQL CMS.
- [Splash](https://github.com/Shopify/polaris-react/tree/master/scripts/splash) - Observe the splash zone of a change across the Shopify's [Polaris](https://polaris.shopify.com) component library.
- [emoj](https://github.com/sindresorhus/emoj) - Find relevant emoji on the command-line.
- [emma](https://github.com/maticzav/emma-cli) - Terminal assistant to find and install npm packages.
- [sindresorhus](https://github.com/sindresorhus/sindresorhus) - The Sindre Sorhus CLI.
- [swiff](https://github.com/simple-integrated-marketing/swiff) - Multi-environment command line tools for time-saving web developers.
- [share](https://github.com/marionebl/share-cli) - Quickly share files from your command line.
- [Kubelive](https://github.com/ameerthehacker/kubelive) - CLI for Kubernetes to provide live data about the cluster and its resources.
- [changelog-view](https://github.com/jdeniau/changelog-view) - Tool view changelog in console.
- [gomoku-terminal](https://github.com/acrazing/gomoku-terminal) - Play online Gomoku in the terminal.
- [cfpush](https://github.com/mamachanko/cfpush) - An interactive Cloud Foundry tutorial in your terminal.
- [startd](https://github.com/mgrip/startd) - Turn your React component into a web app from the command-line.
- [wiki-cli](https://github.com/hexrcs/wiki-cli) - Search Wikipedia and read summaries directly in your terminal.
- [garson](https://github.com/goliney/garson) - Build interactive config-based command-line interfaces.

## 目录

- [快速开始](#getting-started)
- [组件](#components)
  - [`<Text>`](#text)
  - [`<Box>`](#box)
  - [`<Newline>`](#newline)
  - [`<Spacer>`](#spacer)
  - [`<Static>`](#static)
  - [`<Transform>`](#transform)
- [Hooks](#hooks)
  - [`useInput`](#useinputinputhandler-options)
  - [`useApp`](#useapp)
  - [`useStdin`](#usestdin)
  - [`useStdout`](#usestdout)
  - [`useStderr`](#usestderr)
  - [`useFocus`](#usefocusoptions)
  - [`useFocusManager`](#usefocusmanager)
- [API](#api)
- [测试](#testing)
- [使用React开发工具](#using-react-devtools)
- [有用的组件](#useful-components)
- [有用的Hooks](#useful-hooks)
- [用例](#examples)

## 快速开始

使用 [create-ink-app](https://github.com/vadimdemedes/create-ink-app) 来快速搭建一个基 `Ink` CLI.

```
$ mkdir my-ink-cli
$ cd my-ink-cli
$ npx create-ink-app
```

<details><summary>手动设定</summary>
<p>

`Ink` 要使用与在浏览器中运行 `React` 用相同的 `Babel` 配置。

使 `React` 设配置设置 `Babel` ，来确保本 readme 中所有的示例都能够按照预期工作。
在 [安装 Babel](https://babeljs.io/docs/en/usage) 之后, 安装 `@babel/preset-react` 并将下述配置添加到 `babel.config.json` 中:

```
$ npm install --save-dev @babel/preset-react
```

```json
{
	"presets": [
		"@babel/preset-react",
		[
			"@babel/preset-env",
			{
				"targets": {
					"node": true
				}
			}
		]
	]
}
```

接着，创建文件 `source.js`, 在其中你可以使 `Ink` 写代码:

```jsx
import React from 'react';
import {render, Text} from 'ink';

const Demo = () => <Text>Hello World</Text>;

render(<Demo />);
```

然后，使用Babel编译文件:

```
$ npx babel source.js -o cli.js
```

现在你可以通过`Node.js`运行 `cli.js` ：

```
$ node cli
```

如果你不希望在开发中编译文件， 你可以使用 [import-jsx](https://github.com/vadimdemedes/import-jsx) 来 `require()` 一个 JSX 文件，并对其进行即时编译。

</p>
</details>

`Ink` 使用 [Yoga](https://github.com/facebook/yoga) - 一个 `Flexbox` 布局引擎，让你可以使用在浏览器中构建应用程序时所使用的CSS样式工具，为CLI构建出色的用户界面。
需要记住的是，每一个元素都是一个`Flexbox`容器。
你可以把它们当作浏览器中拥有样式 `display: flex` 的 `<div>` 。
关于如何 `Ink` 使用`Flexbox`布局，可以参考内置组件 [`<Box>`](#box) 。
请注意⚠️，所有文本都必须使用组件 [`<Text>`](#text) 包装。

## 组件

### `<Text>`

该组件用于显示文本，并可以更改其样式，以使其变为粗体、斜体或具有下划线、删除线。

```jsx
import {render, Text} from 'ink';

const Example = () => (
	<>
		<Text color="green">I am green</Text>
		<Text color="black" backgroundColor="white">
			I am black on white
		</Text>
		<Text color="#ffffff">I am white</Text>
		<Text bold>I am bold</Text>
		<Text italic>I am italic</Text>
		<Text underline>I am underline</Text>
		<Text strikethrough>I am strikethrough</Text>
		<Text inverse>I am inversed</Text>
	</>
);

render(<Example />);
```

**注意：** `<Text>` 仅允许包含文本节点和其中嵌套的 `<Text>` 组件。例如，你不能在 `<Text>` 中使用 `<Box>` 组件。

#### color

Type: `string`

改变文本的颜色。
Ink 使用 [chalk](https://github.com/chalk/chalk) , 所以支持其所有功能。

```jsx
<Text color="green">Green</Text>
<Text color="#005cc5">Blue</Text>
<Text color="rgb(232, 131, 136)">Red</Text>
```

<img src="media/text-color.jpg" width="247">

#### backgroundColor

Type: `string`

与上面的 `color` 相同，但用于背景色。

```jsx
<Text backgroundColor="green" color="white">Green</Text>
<Text backgroundColor="#005cc5" color="white">Blue</Text>
<Text backgroundColor="rgb(232, 131, 136)" color="white">Red</Text>
```

<img src="media/text-backgroundColor.jpg" width="226">

#### dimColor

Type: `boolean`\
Default: `false`

调暗颜色（减少发光量）。

```jsx
<Text color="red" dimColor>
	Dimmed Red
</Text>
```

<img src="media/text-dimColor.jpg" width="138">

#### bold

Type: `boolean`\
Default: `false`

将文字改为粗体。

#### italic

Type: `boolean`\
Default: `false`

将文字改为斜体。

#### underline

Type: `boolean`\
Default: `false`

为文字增加下划线。

#### strikethrough

Type: `boolean`\
Default: `false`

为文字增加删除线。

#### inverse

Type: `boolean`\
Default: `false`

反转背景色和前景色。

```jsx
<Text inverse color="yellow">
	Inversed Yellow
</Text>
```

<img src="media/text-inverse.jpg" width="138">

#### wrap

Type: `string`\
Allowed values: `wrap` `truncate` `truncate-start` `truncate-middle` `truncate-end`\
Default: `wrap`

该属性决定当Text的宽度大于容器的宽度时，使用包裹或是截断处理文本内容。
如果设置的是`wrap`（同时也是默认值）， Ink 将换行并将文本拆分成多行。
如果设置的是 `truncate-*` ， Ink 将改为截断文本，只显示部分内容，设置中被截断的部分将被截断。

```jsx
<Box width={7}>
	<Text>Hello World</Text>
</Box>
//=> 'Hello\nWorld'

// `truncate` is an alias to `truncate-end`
<Box width={7}>
	<Text wrap="truncate">Hello World</Text>
</Box>
//=> 'Hello…'

<Box width={7}>
	<Text wrap="truncate-middle">Hello World</Text>
</Box>
//=> 'He…ld'

<Box width={7}>
	<Text wrap="truncate-start">Hello World</Text>
</Box>
//=> '…World'
```

### `<Box>`

`<Box>` 构建布局的重要 Ink 组件。
它于浏览器中的 `<div style="display: flex">` 是类似的。

```jsx
import {render, Box, Text} from 'ink';

const Example = () => {
	<Box margin={2}>
		<Text>This is a box with margin</Text>
	</Box>;
};

render(<Example />);
```

#### 尺寸

##### width

Type: `number` `string`

元素的宽度（以单个字符宽度为单位）。
你也可以将其设置为百分比，这将根据父元素的宽度来计算宽度。

```jsx
<Box width={4}>
	<Text>X</Text>
</Box>
//=> 'X   '
```

```jsx
<Box width={10}>
	<Box width="50%">
		<Text>X</Text>
	</Box>
	<Text>Y</Text>
</Box>
//=> 'X    Y'
```

##### height

Type: `number` `string`

元素的高度（以行数为单位）。
你也可以将其设置为百分比，这将根据父元素的高度来计算高度。

```jsx
<Box height={4}>
	<Text>X</Text>
</Box>
//=> 'X\n\n\n'
```

```jsx
<Box height={6} flexDirection="column">
	<Box height="50%">
		<Text>X</Text>
	</Box>
	<Text>Y</Text>
</Box>
//=> 'X\n\n\nY\n\n'
```

##### minWidth

Type: `number`

设置元素的最小宽度。
尚不支持百分比，详情请见： https://github.com/facebook/yoga/issues/872。

##### minHeight

Type: `number`

设置元素的最小高度。
尚不支持百分比，详情请见： https://github.com/facebook/yoga/issues/872。

#### Padding

##### paddingTop

Type: `number`\
Default: `0`

Top padding.

##### paddingBottom

Type: `number`\
Default: `0`

Bottom padding.

##### paddingLeft

Type: `number`\
Default: `0`

Left padding.

##### paddingRight

Type: `number`\
Default: `0`

Right padding.

##### paddingX

Type: `number`\
Default: `0`

水平 padding. 等同于同时设置 `paddingLeft` 和 `paddingRight`.

##### paddingY

Type: `number`\
Default: `0`

垂直 padding. 等同于同时设置 `paddingTop` 和 `paddingBottom`.

##### padding

Type: `number`\
Default: `0`

所有边的 padding，等同于同时设置 `paddingTop`, `paddingBottom`, `paddingLeft` 和 `paddingRight`.

```jsx
<Box paddingTop={2}>Top</Box>
<Box paddingBottom={2}>Bottom</Box>
<Box paddingLeft={2}>Left</Box>
<Box paddingRight={2}>Right</Box>
<Box paddingX={2}>Left and right</Box>
<Box paddingY={2}>Top and bottom</Box>
<Box padding={2}>Top, bottom, left and right</Box>
```

#### Margin

##### marginTop

Type: `number`\
Default: `0`

Top margin.

##### marginBottom

Type: `number`\
Default: `0`

Bottom margin.

##### marginLeft

Type: `number`\
Default: `0`

Left margin.

##### marginRight

Type: `number`\
Default: `0`

Right margin.

##### marginX

Type: `number`\
Default: `0`

水平 margin. 等同于同时设置 `marginLeft` and `marginRight`.

##### marginY

Type: `number`\
Default: `0`

垂直 margin. 等同于同时设置 `marginTop` and `marginBottom`.

##### margin

Type: `number`\
Default: `0`

所有边的 margin，等同于同时设置 `marginTop`, `marginBottom`, `marginLeft` 和 `marginRight`.

```jsx
<Box marginTop={2}>Top</Box>
<Box marginBottom={2}>Bottom</Box>
<Box marginLeft={2}>Left</Box>
<Box marginRight={2}>Right</Box>
<Box marginX={2}>Left and right</Box>
<Box marginY={2}>Top and bottom</Box>
<Box margin={2}>Top, bottom, left and right</Box>
```

#### Flex

##### flexGrow

Type: `number`\
Default: `0`

See [flex-grow](https://css-tricks.com/almanac/properties/f/flex-grow/).

```jsx
<Box>
	<Text>Label:</Text>
	<Box flexGrow={1}>
		<Text>Fills all remaining space</Text>
	</Box>
</Box>
```

##### flexShrink

Type: `number`\
Default: `1`

见 [flex-shrink](https://css-tricks.com/almanac/properties/f/flex-shrink/).

```jsx
<Box width={20}>
	<Box flexShrink={2} width={10}>
		<Text>Will be 1/4</Text>
	</Box>
	<Box width={10}>
		<Text>Will be 3/4</Text>
	</Box>
</Box>
```

##### flexBasis

Type: `number` `string`

见 [flex-basis](https://css-tricks.com/almanac/properties/f/flex-basis/).

```jsx
<Box width={6}>
	<Box flexBasis={3}>
		<Text>X</Text>
	</Box>
	<Text>Y</Text>
</Box>
//=> 'X  Y'
```

```jsx
<Box width={6}>
	<Box flexBasis="50%">
		<Text>X</Text>
	</Box>
	<Text>Y</Text>
</Box>
//=> 'X  Y'
```

##### flexDirection

Type: `string`\
Allowed values: `row` `row-reverse` `column` `column-reverse`

见 [flex-direction](https://css-tricks.com/almanac/properties/f/flex-direction/).

```jsx
<Box>
	<Box marginRight={1}>
		<Text>X</Text>
	</Box>
	<Text>Y</Text>
</Box>
// X Y

<Box flexDirection="row-reverse">
	<Text>X</Text>
	<Box marginRight={1}>
		<Text>Y</Text>
	</Box>
</Box>
// Y X

<Box flexDirection="column">
	<Text>X</Text>
	<Text>Y</Text>
</Box>
// X
// Y

<Box flexDirection="column-reverse">
	<Text>X</Text>
	<Text>Y</Text>
</Box>
// Y
// X
```

##### alignItems

Type: `string`\
Allowed values: `flex-start` `center` `flex-end`

见 [align-items](https://css-tricks.com/almanac/properties/a/align-items/).

```jsx
<Box alignItems="flex-start">
	<Box marginRight={1}>
		<Text>X</Text>
	</Box>
	<Text>
		A
		<Newline/>
		B
		<Newline/>
		C
	</Text>
</Box>
// X A
//   B
//   C

<Box alignItems="center">
	<Box marginRight={1}>
		<Text>X</Text>
	</Box>
	<Text>
		A
		<Newline/>
		B
		<Newline/>
		C
	</Text>
</Box>
//   A
// X B
//   C

<Box alignItems="flex-end">
	<Box marginRight={1}>
		<Text>X</Text>
	</Box>
	<Text>
		A
		<Newline/>
		B
		<Newline/>
		C
	</Text>
</Box>
//   A
//   B
// X C
```

##### alignSelf

Type: `string`\
Default: `auto`\
Allowed vales: `auto` `flex-start` `center` `flex-end`

见 [align-self](https://css-tricks.com/almanac/properties/a/align-self/).

```jsx
<Box height={3}>
	<Box alignSelf="flex-start">
		<Text>X</Text>
	</Box>
</Box>
// X
//
//

<Box height={3}>
	<Box alignSelf="center">
		<Text>X</Text>
	</Box>
</Box>
//
// X
//

<Box height={3}>
	<Box alignSelf="flex-end">
		<Text>X</Text>
	</Box>
</Box>
//
//
// X
```

##### justifyContent

Type: `string`\
Allowed values: `flex-start` `center` `flex-end` `space-between` `space-around`

见 [justify-content](https://css-tricks.com/almanac/properties/j/justify-content/).

```jsx
<Box justifyContent="flex-start">
	<Text>X</Text>
</Box>
// [X      ]

<Box justifyContent="center">
	<Text>X</Text>
</Box>
// [   X   ]

<Box justifyContent="flex-end">
	<Text>X</Text>
</Box>
// [      X]

<Box justifyContent="space-between">
	<Text>X</Text>
	<Text>Y</Text>
</Box>
// [X      Y]

<Box justifyContent="space-around">
	<Text>X</Text>
	<Text>Y</Text>
</Box>
// [  X   Y  ]
```

#### Visibility

##### display

Type: `string`\
Allowed values: `flex` `none`\
Default: `flex`

该值设置为`none`时不显示元素

#### Borders

##### borderStyle

Type: `string`\
Allowed values: `single` `double` `round` `bold` `singleDouble` `doubleSingle` `classic`

添加特定样式的边框
如果 `borderStyle` 被设置为 `undefined` （默认值），则无边框。
Ink 从 [`cli-boxes`](https://github.com/sindresorhus/cli-boxes) 模块中获取边框样式。

```jsx
<Box flexDirection="column">
	<Box>
		<Box borderStyle="single" marginRight={2}>
			<Text>single</Text>
		</Box>

		<Box borderStyle="double" marginRight={2}>
			<Text>double</Text>
		</Box>

		<Box borderStyle="round" marginRight={2}>
			<Text>round</Text>
		</Box>

		<Box borderStyle="bold">
			<Text>bold</Text>
		</Box>
	</Box>

	<Box marginTop={1}>
		<Box borderStyle="singleDouble" marginRight={2}>
			<Text>singleDouble</Text>
		</Box>

		<Box borderStyle="doubleSingle" marginRight={2}>
			<Text>doubleSingle</Text>
		</Box>

		<Box borderStyle="classic">
			<Text>classic</Text>
		</Box>
	</Box>
</Box>
```

<img src="media/box-borderStyle.jpg" width="521">

See example in [examples/borders](examples/borders/borders.js).

##### borderColor

Type: `string`

改变边框的颜色
接受与`<Text>`中相同的 [`颜色`](#color) 参数。

```jsx
<Box borderStyle="round" borderColor="green">
	<Text>Green Rounded Box</Text>
</Box>
```

<img src="media/box-borderColor.jpg" width="228">

### `<Newline>`

添加一个或多个 (`\n`) 字符。
必须在 `<Text>` 中使用。

#### count

Type: `number`\
Default: `1`

添加的空白行的数量。

```jsx
import {render, Text, Newline} from 'ink';

const Example = () => (
	<Text>
		<Text color="green">Hello</Text>
		<Newline />
		<Text color="red">World</Text>
	</Text>
);

render(<Example />);
```

Output:

```
Hello
World
```

### `<Spacer>`

一个可延伸的空白元素，可以自动填充包含其的容器。
作为填充元素之间所有可用空间的元素很有用。

例如，在一个采用了默认`flex-direction`(`row`)的`<Box>`中使用`<Spacer>`会将"Left"放在容器左侧，"Right"推到容器右侧。

```jsx
import {render, Box, Text, Spacer} from 'ink';

const Example = () => (
	<Box>
		<Text>Left</Text>
		<Spacer />
		<Text>Right</Text>
	</Box>
);

render(<Example />);
```

在一个采用了`flex-direction: column`的`<Box>`中使用`<Spacer>`会将"Top"放置在容器顶部，"Bottom"推到容器底部。请注意，容器必须足够高才能够生效。

```jsx
import {render, Box, Text, Spacer} from 'ink';

const Example = () => (
	<Box flexDirection="column" height={10}>
		<Text>Top</Text>
		<Spacer />
		<Text>Bottom</Text>
	</Box>
);

render(<Example />);
```

### `<Static>`

`<Static>` 会将其包裹的元素永久性地输出在其他元素上方。
在需要显示活动信息（如完成的任务或日志）时很有用。这些活动在呈现后不会被改变（正如其名字"Static"）。

当你无法了解或者控制需要呈现的项目数量时，最好使用`<Static>`来包裹此类用例。

例如， [Tap](https://github.com/tapjs/node-tap) 使用 `<Static>` 来显示已完成测试的列表。
[Gatsby](https://github.com/gatsbyjs/gatsby) 用它来显示已经生成页面的列表，同时仍显示实时进度栏。

```jsx
import React, {useState, useEffect} from 'react';
import {render, Static, Box, Text} from 'ink';

const Example = () => {
	const [tests, setTests] = useState([]);

	useEffect(() => {
		let completedTests = 0;
		let timer;

		const run = () => {
			// Fake 10 completed tests
			if (completedTests++ < 10) {
				setTests(previousTests => [
					...previousTests,
					{
						id: previousTests.length,
						title: `Test #${previousTests.length + 1}`
					}
				]);

				setTimeout(run, 100);
			}
		};

		run();

		return () => {
			clearTimeout(timer);
		};
	}, []);

	return (
		<>
			{/* This part will be rendered once to the terminal */}
			<Static items={tests}>
				{test => (
					<Box key={test.id}>
						<Text color="green">✔ {test.title}</Text>
					</Box>
				)}
			</Static>

			{/* This part keeps updating as state changes */}
			<Box marginTop={1}>
				<Text dimColor>Completed tests: {tests.length}</Text>
			</Box>
		</>
	);
};

render(<Example />);
```

**注意：** `<Static>` 只会渲染在 `items` 选项中传入的新项目而忽略先前已经渲染的项目。
这意味着，当你将新项目添加到项目数组时，对先前项目所做的更改不会触发重新渲染。

See [examples/static](examples/static/static.js) for an example usage of `<Static>` component.

#### items

Type: `Array`

Array of items of any type to render using a function you pass as a component child.

#### style

Type: `object`

Styles to apply to a container of child elements.
See [`<Box>`](#box) for supported properties.

```jsx
<Static items={...} style={{padding: 1}}>
	{...}
</Static>
```

#### children(item)

Type: `Function`

Function that is called to render every item in `items` array.
First argument is an item itself and second argument is index of that item in
`items` array.

Note that `key` must be assigned to the root component.

```jsx
<Static items={['a', 'b', 'c']}>
	{(item, index) => {
		// This function is called for every item in ['a', 'b', 'c']
		// `item` is 'a', 'b', 'c'
		// `index` is 0, 1, 2
		return (
			<Box key={index}>
				<Text>Item: {item}</Text>
			</Box>
		);
	}}
</Static>
```

### `<Transform>`

Transform a string representation of React components before they are written to output.
For example, you might want to apply a [gradient to text](https://github.com/sindresorhus/ink-gradient), [add a clickable link](https://github.com/sindresorhus/ink-link) or [create some text effects](https://github.com/sindresorhus/ink-big-text).
These use cases can't accept React nodes as input, they are expecting a string.
That's what `<Transform>` component does, it gives you an output string of its child components and lets you transform it in any way.

**Note:** `<Transform>` must be applied only to `<Text>` children components and shouldn't change the dimensions of the output, otherwise layout will be incorrect.

```jsx
import {render, Transform} from 'ink';

const Example = () => (
	<Transform transform={output => output.toUpperCase()}>
		<Text>Hello World</Text>
	</Transform>
);

render(<Example />);
```

Since `transform` function converts all characters to upper case, final output that's rendered to the terminal will be "HELLO WORLD", not "Hello World".

#### transform(children)

Type: `Function`

Function which transforms children output.
It accepts children and must return transformed children too.

##### children

Type: `string`

Output of child components.

## Hooks

### useInput(inputHandler, options?)

This hook is used for handling user input.
It's a more convienient alternative to using `useStdin` and listening to `data` events.
The callback you pass to `useInput` is called for each character when user enters any input.
However, if user pastes text and it's more than one character, the callback will be called only once and the whole string will be passed as `input`.
You can find a full example of using `useInput` at [examples/use-input](examples/use-input/use-input.js).

```jsx
import {useInput} from 'ink';

const UserInput = () => {
	useInput((input, key) => {
		if (input === 'q') {
			// Exit program
		}

		if (key.leftArrow) {
			// Left arrow key pressed
		}
	});

	return …
};
```

#### inputHandler(input, key)

Type: `Function`

The handler function that you pass to `useInput` receives two arguments:

##### input

Type: `string`

The input that the program received.

##### key

Type: `object`

Handy information about a key that was pressed.

###### key.leftArrow

###### key.rightArrow

###### key.upArrow

###### key.downArrow

Type: `boolean`\
Default: `false`

If an arrow key was pressed, the corresponding property will be `true`.
For example, if user presses left arrow key, `key.leftArrow` equals `true`.

###### key.return

Type: `boolean`\
Default: `false`

Return (Enter) key was pressed.

###### key.escape

Type: `boolean`\
Default: `false`

Escape key was pressed.

###### key.ctrl

Type: `boolean`\
Default: `false`

Ctrl key was pressed.

###### key.shift

Type: `boolean`\
Default: `false`

Shift key was pressed.

###### key.tab

Type: `boolean`\
Default: `false`

Tab key was pressed.

###### key.backspace

Type: `boolean`\
Default: `false`

Backspace key was pressed.

###### key.delete

Type: `boolean`\
Default: `false`

Delete key was pressed.

###### key.pageDown

###### key.pageUp

Type: `boolean`\
Default: `false`

If Page Up or Page Down key was pressed, the corresponding property will be `true`.
For example, if user presses Page Down, `key.pageDown` equals `true`.

###### key.meta

Type: `boolean`\
Default: `false`

[Meta key](https://en.wikipedia.org/wiki/Meta_key) was pressed.

#### options

Type: `object`

##### isActive

Type: `boolean`\
Default: `true`

Enable or disable capturing of user input.
Useful when there are multiple `useInput` hooks used at once to avoid handling the same input several times.

### useApp()

`useApp` is a React hook, which exposes a method to manually exit the app (unmount).

#### exit(error?)

Type: `Function`

Exit (unmount) the whole Ink app.

##### error

Type: `Error`

Optional error. If passed, [`waitUntilExit`](waituntilexit) will reject with that error.

```js
import {useApp} from 'ink';

const Example = () => {
	const {exit} = useApp();

	// Exit the app after 5 seconds
	useEffect(() => {
		setTimeout(() => {
			exit();
		}, 5000);
	}, []);

	return …
};
```

### useStdin()

`useStdin` is a React hook, which exposes stdin stream.

#### stdin

Type: `stream.Readable`\
Default: `process.stdin`

Stdin stream passed to `render()` in `options.stdin` or `process.stdin` by default.
Useful if your app needs to handle user input.

```js
import {useStdin} from 'ink';

const Example = () => {
	const {stdin} = useStdin();

	return …
};
```

#### isRawModeSupported

Type: `boolean`

A boolean flag determining if the current `stdin` supports `setRawMode`.
A component using `setRawMode` might want to use `isRawModeSupported` to nicely fall back in environments where raw mode is not supported.

```jsx
import {useStdin} from 'ink';

const Example = () => {
	const {isRawModeSupported} = useStdin();

	return isRawModeSupported ? (
		<MyInputComponent />
	) : (
		<MyComponentThatDoesntUseInput />
	);
};
```

#### setRawMode(isRawModeEnabled)

Type: `function`

##### isRawModeEnabled

Type: `boolean`

See [`setRawMode`](https://nodejs.org/api/tty.html#tty_readstream_setrawmode_mode).
Ink exposes this function to be able to handle <kbd>Ctrl</kbd>+<kbd>C</kbd>, that's why you should use Ink's `setRawMode` instead of `process.stdin.setRawMode`.

**Warning:** This function will throw unless the current `stdin` supports `setRawMode`. Use [`isRawModeSupported`](#israwmodesupported) to detect `setRawMode` support.

```js
import {useStdin} from 'ink';

const Example = () => {
	const {setRawMode} = useStdin();

	useEffect(() => {
		setRawMode(true);

		return () => {
			setRawMode(false);
		};
	});

	return …
};
```

### useStdout()

`useStdout` is a React hook, which exposes stdout stream, where Ink renders your app.

#### stdout

Type: `stream.Writable`\
Default: `process.stdout`

```js
import {useStdout} from 'ink';

const Example = () => {
	const {stdout} = useStdout;

	return …
};
```

#### write(data)

Write any string to stdout, while preserving Ink's output.
It's useful when you want to display some external information outside of Ink's rendering and ensure there's no conflict between the two.
It's similar to `<Static>`, except it can't accept components, it only works with strings.

##### data

Type: `string`

Data to write to stdout.

```js
import {useStdout} from 'ink';

const Example = () => {
	const {write} = useStdout();

	useEffect(() => {
		// Write a single message to stdout, above Ink's output
		write('Hello from Ink to stdout\n');
	}, []);

	return …
};
```

See additional usage example in [examples/use-stdout](examples/use-stdout/use-stdout.js).

### useStderr()

`useStderr` is a React hook, which exposes stderr stream.

#### stderr

Type: `stream.Writable`\
Default: `process.stderr`

Stderr stream.

```js
import {useStderr} from 'ink';

const Example = () => {
	const {stderr} = useStderr();

	return …
};
```

#### write(data)

Write any string to stderr, while preserving Ink's output.

It's useful when you want to display some external information outside of Ink's rendering and ensure there's no conflict between the two.
It's similar to `<Static>`, except it can't accept components, it only works with strings.

##### data

Type: `string`

Data to write to stderr.

```js
import {useStderr} from 'ink';

const Example = () => {
	const {write} = useStderr();

	useEffect(() => {
		// Write a single message to stderr, above Ink's output
		write('Hello from Ink to stderr\n');
	}, []);

	return …
};
```

### useFocus(options?)

Component that uses `useFocus` hook becomes "focusable" to Ink, so when user presses <kbd>Tab</kbd>, Ink will switch focus to this component.
If there are multiple components that execute `useFocus` hook, focus will be given to them in the order that these components are rendered in.
This hook returns an object with `isFocused` boolean property, which determines if this component is focused or not.

#### options

##### autoFocus

Type: `boolean`\
Default: `false`

Auto focus this component, if there's no active (focused) component right now.

##### isActive

Type: `boolean`\
Default: `true`

Enable or disable this component's focus, while still maintaining its position in the list of focusable components.
This is useful for inputs that are temporarily disabled.

```jsx
import {render, useFocus, Text} from 'ink';

const Example = () => {
	const {isFocused} = useFocus();

	return <Text>{isFocused ? 'I am focused' : 'I am not focused'}</Text>;
};

render(<Example />);
```

See example in [examples/use-focus](examples/use-focus/use-focus.js).

### useFocusManager()

This hook exposes methods to enable or disable focus management for all components or manually switch focus to next or previous components.

#### enableFocus()

Enable focus management for all components.

**Note:** You don't need to call this method manually, unless you've disabled focus management. Focus management is enabled by default.

```js
import {useFocusManager} from 'ink';

const Example = () => {
	const {enableFocus} = useFocusManager();

	useEffect(() => {
		enableFocus();
	}, []);

	return …
};
```

#### disableFocus()

Disable focus management for all components.
Currently active component (if there's one) will lose its focus.

```js
import {useFocusManager} from 'ink';

const Example = () => {
	const {disableFocus} = useFocusManager();

	useEffect(() => {
		disableFocus();
	}, []);

	return …
};
```

#### focusNext()

Switch focus to the next focusable component.
If there's no active component right now, focus will be given to the first focusable component.
If active component is the last in the list of focusable components, focus will be switched to the first component.

**Note:** Ink calls this method when user presses <kbd>Tab</kbd>.

```js
import {useFocusManager} from 'ink';

const Example = () => {
	const {focusNext} = useFocusManager();

	useEffect(() => {
		focusNext();
	}, []);

	return …
};
```

#### focusPrevious()

Switch focus to the previous focusable component.
If there's no active component right now, focus will be given to the first focusable component.
If active component is the first in the list of focusable components, focus will be switched to the last component.

**Note:** Ink calls this method when user presses <kbd>Shift</kbd>+<kbd>Tab</kbd>.

```js
import {useFocusManager} from 'ink';

const Example = () => {
	const {focusPrevious} = useFocusManager();

	useEffect(() => {
		focusPrevious();
	}, []);

	return …
};
```

## API

#### render(tree, options?)

Returns: [`Instance`](#instance)

Mount a component and render the output.

##### tree

Type: `ReactElement`

##### options

Type: `object`

###### stdout

Type: `stream.Writable`\
Default: `process.stdout`

Output stream where app will be rendered.

###### stdin

Type: `stream.Readable`\
Default: `process.stdin`

Input stream where app will listen for input.

###### exitOnCtrlC

Type: `boolean`\
Default: `true`

Configure whether Ink should listen to Ctrl+C keyboard input and exit the app.
This is needed in case `process.stdin` is in [raw mode](https://nodejs.org/api/tty.html#tty_readstream_setrawmode_mode), because then Ctrl+C is ignored by default and process is expected to handle it manually.

###### patchConsole

Type: `boolean`\
Default: `true`

Patch console methods to ensure console output doesn't mix with Ink output.
When any of `console.*` methods are called (like `console.log()`), Ink intercepts their output, clears main output, renders output from the console method and then rerenders main output again.
That way both are visible and are not overlapping each other.

This functionality is powered by [patch-console](https://github.com/vadimdemedes/patch-console), so if you need to disable Ink's interception of output but want to build something custom, you can use it.

###### debug

Type: `boolean`\
Default: `false`

If `true`, each update will be rendered as a separate output, without replacing the previous one.

#### Instance

This is the object that `render()` returns.

##### rerender(tree)

Replace previous root node with a new one or update props of the current root node.

###### tree

Type: `ReactElement`

```jsx
// Update props of the root node
const {rerender} = render(<Counter count={1} />);
rerender(<Counter count={2} />);

// Replace root node
const {rerender} = render(<OldCounter />);
rerender(<NewCounter />);
```

##### unmount()

Manually unmount the whole Ink app.

```jsx
const {unmount} = render(<MyApp />);
unmount();
```

##### waitUntilExit()

Returns a promise, which resolves when app is unmounted.

```jsx
const {unmount, waitUntilExit} = render(<MyApp />);

setTimeout(unmount, 1000);

await waitUntilExit(); // resolves after `unmount()` is called
```

##### clear()

Clear output.

```jsx
const {clear} = render(<MyApp />);
clear();
```

#### measureElement(ref)

Measure the dimensions of a particular `<Box>` element.
It returns an object with `width` and `height` properties.
This function is useful when your component needs to know the amount of available space it has. You could use it when you need to change the layout based on the length of its content.

**Note:** `measureElement()` returns correct results only after the initial render, when layout has been calculated. Until then, `width` and `height` equal to zero. It's recommended to call `measureElement()` in a `useEffect` hook, which fires after the component has rendered.

##### ref

Type: `MutableRef`

A reference to a `<Box>` element captured with a `ref` property.
See [Refs](https://reactjs.org/docs/refs-and-the-dom.html) for more information on how to capture references.

```jsx
import {render, measureElement, Box, Text} from 'ink';

const Example = () => {
	const ref = useRef();

	useEffect(() => {
		const {width, height} = measureElement(ref.current);
		// width = 100, height = 1
	}, []);

	return (
		<Box width={100}>
			<Box ref={ref}>
				<Text>This box will stretch to 100 width</Text>
			</Box>
		</Box>
	);
};

render(<Example />);
```

## Testing

Ink components are simple to test with [ink-testing-library](https://github.com/vadimdemedes/ink-testing-library).
Here's a simple example that checks how component is rendered:

```jsx
import React from 'react';
import {Text} from 'ink';
import {render} from 'ink-testing-library';

const Test = () => <Text>Hello World</Text>;
const {lastFrame} = render(<Test />);

lastFrame() === 'Hello World'; //=> true
```

Check out [ink-testing-library](https://github.com/vadimdemedes/ink-testing-library) for more examples and full documentation.

## Using React Devtools

![](media/devtools.jpg)

Ink supports [React Devtools](https://github.com/facebook/react/tree/master/packages/react-devtools) out-of-the-box.
To enable integration with React Devtools in your Ink-based CLI, run it with `DEV=true` environment variable:

```
$ DEV=true my-cli
```

Then, start React Devtools itself:

```
$ npx react-devtools
```

After it starts up, you should see the component tree of your CLI.
You can even inspect and change the props of components, and see the results immediatelly in the CLI, without restarting it.

**Note**: You must manually quit your CLI via <kbd>Ctrl</kbd>+<kbd>C</kbd> after you're done testing.

## Useful Components

- [ink-text-input](https://github.com/vadimdemedes/ink-text-input) - Text input.
- [ink-spinner](https://github.com/vadimdemedes/ink-spinner) - Spinner.
- [ink-select-input](https://github.com/vadimdemedes/ink-select-input) - Select (dropdown) input.
- [ink-link](https://github.com/sindresorhus/ink-link) - Link component.
- [ink-gradient](https://github.com/sindresorhus/ink-gradient) - Gradient color component.
- [ink-big-text](https://github.com/sindresorhus/ink-big-text) - Awesome text component.
- [ink-image](https://github.com/kevva/ink-image) - Display images inside the terminal.
- [ink-tab](https://github.com/jdeniau/ink-tab) - Tab component.
- [ink-color-pipe](https://github.com/LitoMore/ink-color-pipe) - Create color text with simpler style strings in Ink.
- [ink-multi-select](https://github.com/karaggeorge/ink-multi-select) - Select one or more values from a list
- [ink-divider](https://github.com/JureSotosek/ink-divider) - A divider component.
- [ink-progress-bar](https://github.com/brigand/ink-progress-bar) - Configurable component for rendering progress bars.
- [ink-table](https://github.com/maticzav/ink-table) - Table component.
- [ink-ascii](https://github.com/hexrcs/ink-ascii) - Awesome text component with more font choices, based on Figlet.
- [ink-markdown](https://github.com/cameronhunter/ink-markdown) - Render syntax highlighted Markdown.
- [ink-quicksearch-input](https://github.com/Eximchain/ink-quicksearch-input) - Select component with fast quicksearch-like navigation.
- [ink-confirm-input](https://github.com/kevva/ink-confirm-input) - Yes/No confirmation input.

## Useful Hooks

- [ink-use-stdout-dimensions](https://github.com/cameronhunter/ink-monorepo/tree/master/packages/ink-use-stdout-dimensions) - Subscribe to stdout dimensions.

## Examples

- [Jest](examples/jest/jest.js) - Implementation of basic Jest UI [(live demo)](https://ink-jest-demo.vadimdemedes.repl.run/).
- [Counter](examples/counter/counter.js) - Simple counter that increments every 100ms [(live demo)](https://ink-counter-demo.vadimdemedes.repl.run/).
- [Form with Validation](https://github.com/final-form/rff-cli-example) - Manage form state using [Final Form](https://github.com/final-form/final-form#-final-form).
- [Borders](examples/borders/borders.js) - Add borders to `<Box>` component.
- [Suspense](examples/suspense/suspense.js) - Use React Suspense.
- [Table](examples/table/table.js) - Render a table with multiple columns and rows.
- [Focus Management](examples/use-focus/use-focus.js) - Use `useFocus` hook to manage focus between components.
- [User Input](examples/use-input/use-input.js) - Listen to user input.
- [Write to stdout](examples/use-stdout/use-stdout.js) - Write to stdout bypassing main Ink output.
- [Write to stderr](examples/use-stderr/use-stderr.js) - Write to stderr bypassing main Ink output.
- [Static](examples/static/static.js) - Use `<Static>` to render permanent output.

## Maintainers

- [Vadim Demedes](https://github.com/vadimdemedes)
- [Sindre Sorhus](https://github.com/sindresorhus)
