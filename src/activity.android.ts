import {setActivityCallbacks, AndroidActivityCallbacks} from "tns-core-modules/ui/frame";
import { ViewBase } from "tns-core-modules/ui/core/view-base";
import * as app from "tns-core-modules/application";
import { KeyCodes } from "./keycodes";

// The class below is not currently used (also commented in AndroidManifest.xml)
@JavaProxy("com.tns.SimpleCTVActivity")
class SimpleCTVActivity extends androidx.appcompat.app.AppCompatActivity {
  public isNativeScriptActivity;
  private _callbacks: AndroidActivityCallbacks;

  public onCreate(savedInstanceState: android.os.Bundle): void {
      // Set the isNativeScriptActivity in onCreate (as done in the original NativeScript activity code)
      // The JS constructor might not be called because the activity is created from Android.
      this.isNativeScriptActivity = true;
      if (!this._callbacks) {
          setActivityCallbacks(this);
      }

      this._callbacks.onCreate(this, savedInstanceState, this.getIntent(), super.onCreate);
  }

  public onSaveInstanceState(outState: android.os.Bundle): void {
      this._callbacks.onSaveInstanceState(this, outState, super.onSaveInstanceState);
  }

  public onStart(): void {
      this._callbacks.onStart(this, super.onStart);
  }

  public onStop(): void {
      this._callbacks.onStop(this, super.onStop);
  }

  public onDestroy(): void {
      this._callbacks.onDestroy(this, super.onDestroy);
  }

  public onBackPressed(): void {
      this._callbacks.onBackPressed(this, super.onBackPressed);
  }

  public onRequestPermissionsResult(requestCode: number, permissions: Array<string>, grantResults: Array<number>): void {
      this._callbacks.onRequestPermissionsResult(this, requestCode, permissions, grantResults, undefined /*TODO: Enable if needed*/);
  }

  public onActivityResult(requestCode: number, resultCode: number, data: android.content.Intent): void {
      this._callbacks.onActivityResult(this, requestCode, resultCode, data, super.onActivityResult);
  }
  
  public onPostResume(): void {
    this._callbacks.onPostResume(this, super.onPostResume);
  }

  public dispatchKeyEvent(event: android.view.KeyEvent): boolean {
    // you can respond to specific keycodes by fi. registering a listener and invoking it when appropriate
    // console.log("D-Pad center button pressed? " + event.getAction() + " "  + event.getKeyCode() + "   "+ (event.getKeyCode() === android.view.KeyEvent.KEYCODE_DPAD_CENTER));

    // let's highlight the element that currently has the focus
    if (event.getAction()!=android.view.KeyEvent.ACTION_DOWN) {
        var eventData = {
            eventName: "AppKeyEvent",
            keycode: event.getKeyCode(),
            action: event.getAction()==android.view.KeyEvent.ACTION_DOWN?"down":"up"
        };

        app.notify(eventData);
    }
    if (KeyCodes.isRemoteEvent(event.getKeyCode())) {
        return true;
    }
    return super.dispatchKeyEvent(event);
  }
}
