import { h, render } from 'preact';

declare const controller: CS.Views.ExampleView2.ExampleView2Controller;

const App = () => {
  return <div class="w-full h-full justify-center items-center bg-red-500 text-white text-2xl">{controller.Text}</div>;
};

render(<App />, document.body);
