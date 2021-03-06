export class KeyCodes {
    public static readonly up: number = 19;
    public static readonly down: number = 20;
    public static readonly left: number = 21;
    public static readonly right: number = 22;
    public static readonly select: number = 23;
    public static readonly enter: number = 66;
    
    public static readonly playpause: number = 85;
    public static readonly ff2: number = 90;
    public static readonly ff: number = 999910;
    public static readonly rw: number = 89;
    public static readonly mute: number = 91;
    
    public static readonly menu: number = 82;
    
    public static isRemoteEvent(keycode: number) {
        switch (keycode) {
            case KeyCodes.up:
            case KeyCodes.down:
            case KeyCodes.left:
            case KeyCodes.right:
            case KeyCodes.select:
            //case KeyCodes.enter:
            
            case KeyCodes.playpause:
            case KeyCodes.ff:
            case KeyCodes.ff2:
            case KeyCodes.rw:
            case KeyCodes.mute:
                    
            case KeyCodes.menu:
                return true;
                
            default:
                return false;
        }
    }
}
