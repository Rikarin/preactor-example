declare namespace CS {
        class Readme extends UnityEngine.ScriptableObject
        {
            protected [__keep_incompatibility]: never;
            public icon : UnityEngine.Texture2D
            public title : string
            public sections : System.Array$1<Readme.Section>
            public loadedLayout : boolean
            public constructor ()
        }
        namespace Readme {
        class Section extends System.Object
        {
            protected [__keep_incompatibility]: never;
            public heading : string
            public text : string
            public linkText : string
            public url : string
            public constructor ()
        }
    }
    namespace Views.ExampleView2 {
        class ExampleView2Controller extends UnityEngine.MonoBehaviour
        {
            protected [__keep_incompatibility]: never;
            public get Text(): string;
            public set Text(value: string);
            public constructor ()
        }
    }
}
