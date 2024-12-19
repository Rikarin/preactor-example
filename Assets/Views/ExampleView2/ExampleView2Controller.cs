using UnityEngine;

namespace Views.ExampleView2 {
    public class ExampleView2Controller : MonoBehaviour {
        public string Text { get; set; }

        void Awake() {
            Text = "Hello from ExampleView2Controller";
        }
    }
}
