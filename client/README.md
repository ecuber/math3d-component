# math3d-component

This package is a componentized version of the fantastic [math3d-react](https://github.com/ChristopherChudzicki/math3d-react) website. This means you can include your very own self-hosted instance of [math3d.org](https://math3d.org) with minimal setup on your end.

## Setup with Create React App (recommended)

If you are using [create-react-app](https://create-react-app.dev/), all you need to do is include the following script imports in your base `./public/index.html` file:

```html
  <!-- JQuery -->
  <script src="https://code.jquery.com/jquery-2.2.0.min.js"></script>
  <!-- MathQuill -->
  <script src="/mathquill.min.js"></script>
  <link rel="stylesheet" href="/mathquill.css">
  <!-- MathBox -->
  <script src="/mathbox-bundle.min.js"></script>
  <link rel="stylesheet" href="/mathbox.css">
```

These imports should be placed in the `<head></head>` section of index.html so that they are loaded before the component is.

### Required Scripts

You will need to include the appropriate files to import in your public folder as well. An example has been provided in [the app directory](https://github.com/ecuber/math3d-component/tree/master/app/public) in [the component's repository](https://github.com/ecuber/math3d-component). 

* mathbox-bundle.min.js
* mathbox.css
* mathquill.min.js
* mathquill.css

Optionally, you may include your own jquery installation in your public folder as well.abs

## Setting up without CRA

The component was tested under the environment described in the CRA setup section. As such, it is possible that you'll run into some weird issues if you choose to try another setup!

### Dependencies

[MathQuill depends on JQuery 1.5.2+](http://docs.mathquill.com/en/latest/Getting_Started/#download-and-load). Be sure to import that is imported **BEFORE** MathQuill.

### Required Variables

The math3d-component code relies on the following variables being present:

| Variable Name    | Type     | Source                                                                                                           | Description                                                                                                                                                                           |   |
|------------------|----------|------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---|
| mathBox          | constructor | [mathbox-bundle.min.js](https://github.com/ecuber/math3d-component/blob/master/app/public/mathbox-bundle.min.js) | `mathBox` is a function exported by the MathBox bundle that constructs a MathBox object. Importing this via HTML script tag makes the function available globally. See the [MathBox documentation](https://github.com/unconed/mathbox) for more information. |   |
| window.MathQuill | object   | [mathquill.min.js](https://github.com/ecuber/math3d-component/blob/master/app/public/mathquill.min.js)           | The `MathQuill` object is attached to the `window` when importing the MathQuill bundle via HTML. See the [MathQuill documentation](http://docs.mathquill.com/en/latest/Getting_Started/) for more information on importing.                     |   |

## Using the component

### Basic example
```js
import React from 'react'
import Math3D from 'math3d-component'
import myGraphs from './myGraphs.json'

export default const App = (props) => {
  /**
   * You may store your dehydrated graphs however you like. If you have an existing database 
   * for your website, that's a great option! In this case, I have a file called myGraphs.json
   * in the same directory as this component file.
   * */
  const graphID = 'z6rPenvx'
  const dehydratedScene = myGraphs[graphID] // a JSON object containing the Math3D scene data

  return <Math3D dehydrated={dehydratedScene} style={{ width: '80%' }} />
}
```

### Development mode with custom save function
```js
import React from 'react'
import Math3D from 'math3d-component'
import myGraphs from './myGraphs.json'

/** POSTs to an API endpoint that saves the graph to a file */
const saveGraph = (dehydrated) => {
    fetch('dev/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ dehydrated })
  } )
  .then((res) => {
    if (res.ok) {
      console.log('successfully saved graph!')
    }
  } )
}

export default const App = (props) => {
  // Will render a Math3D component with a save button visible. 
  return <Math3D dev={true} save={saveGraph} />
}
```

### Component Props

All props are optional, but if you want to show anything other than the default scene then you will more than likely want to customize the component behavior with these settings:

| Name | Type  | Default | Description | Implementation |
|------------|---------|---------|-------------|---|
| dehydrated | object  | `null`    | The dehydrated scene object. The component will render the scene if it is valid (it will be if it is generated by the component). | Get the object by fetching it from your database or a local file and pass it here! |
| drawer     | boolean | `false`   | Whether or not to open the Math3D drawer. This appears on the left side and contains options to view and edit existing math objects or create new ones. | `true` if you want the reader to see the scene setup (i.e. functions you graphed) when the page loads, `false` for a cleaner display |
| style      | object | `{width: '100%', height: '100%'}`   | The style properties for the Math3D component. | The component will take up the full height and width of its parent container by default. Feel free to adjust that behavior in the parent or in the style props. |
| dev     | boolean | `false`   | Whether or not to enable developer/editing mode | This should **always** be set to false in production mode. Enabling dev mode reveals the drawer by default and also renders a "Save Graph" button that does not appear if dev mode is false. See the [Saving Scenes](#saving-scenes) section below for more info. |
| save   | function | `(dehydrated) => {}`   | The function that is called when the "Save Graph" button is clicked. | See [Saving Scenes](#saving-scenes). The component will dehydrate and pass the latest graph state as a parameter to the function.

### Saving Scenes

The only way to save scenes is in development mode. This means you (yes, you!) must physically click the **Save Graph** button in the top right corner of the component once you are done setting up your scene. Clicking on the button will do 2 things:

1. Run whatever function you passed as a prop, and give it the latest version of the component state in its dehydrated JSON form for you to store somewhere.
    * The `dehydrated` parameter that is passed to this function is what you'll want to store somewhere.
    * To use the component again, you'll want to reference whereever you save this object (see [this example repository](https://github.com/ecuber/math3d-component/blob/master/app) for ideas on how to do that!)
2. Render another button for you to copy the dehydrated state to your keyboard. If you do not want to implement an automatic saving function, you may use this button and manually save the dehydrated scene somewhere yourself.

**WARNING:** The component will not automatically save your work! Be extremely careful not to do anything that might trigger a hot-reload (i.e. saving/editing a javascript file, etc.) or reloading the page manually while you are editing a graph. You **will** lose your progress. Instead, save frequently and be careful!

### About the `dehydrated` object

Every `dehydrated` object will come with a unique `metadata.id` property (8-character random string) that is generated fresh for each new instance of the component, or each time you save without providing a `dehydrated` prop.

This can be useful for creating unique keys for each of your graphs in your database, etc. **If you provide a `dehydrated` object to the component, it will not touch the `id` property, even if you make changes to the graph!**

**Example**
```js
/* dehydrated object */
{
  metadata: {
    id: 'z6rPenvx',
    // rest of metadata
  }
  // rest of dehydrated
}
```


#### Recommended Workflow

1. Create a new, blank webpage. Add an instance of the Math3D component to the page. Set the `dev` prop to true, and set up your `save` function.
2. Start the dev server.
3. Save the scene immediately! **Take note of the unique ID in the display underneath the save button.**
4. Return to your page code and update it to provide the `<Math3D/>` component with the `dehydrated` prop. It's best if this is a dynamic reference, so if the value of the graph changes, your graph will render from the same place.
5. Finish editing your graph. Each time you make a major change, press that save button! This will call your save function and update your records in case you close the tab or reload by accident.


## Why all this setup?

The original project, [math3d-react](https://github.com/ChristopherChudzicki/math3d-react), was intended to be a standalone website running in its own environment, so using these window-level imports made sense then. The only way to package it all into a reusable component without significantly changing the implementation of each package is to include the same global variables where they are necessary. It's probably possible to work some webpack magic to handle these imports on the component side (I tried), but the easy solution is to just import them on the client side.
