function createElement() {
    return html`
        <my--default>
            <h1>Software</h1>
            <my-card title="aTV" url="#software-atv" image="./images/atv.png"></my-card>
            <my-card title="Folder Saver" url="#software-foldersaver" image="./images/foldersaver.png"></my-card>
            <my-card title="MFT" url="#software-mft" image="./images/mft.png"></my-card>
            <my-card title="Muted Tray" url="#software-mutedtray" image="./images/mutedtray.png"></my-card>
            <my-card title="Net Blocker" url="#software-netblocker" image="./images/netblocker.png"></my-card>
        </my--default>
        
        <my--atv>
            <my-simplepage title="aTV"
                description="aTV (animated Texture Viewer) is a micro java app to view vertical (Minecraft-compatible) animated spritesheets while editing the image. Will automatically refresh when you save.<br><br>To load a new image press load.<br>Manually reloading is also possible by pressing the update button<br>Double click the image to toggle between showing GUI and not showing GUI.<br>Right click the image to choose the desired preview size."
                image="./images/atv.png" download="./downloads/atv/aTV.jar">
            </my-simplepage>
        </my--atv>
        
        <my--foldersaver>
            <my-simplepage title="Folder Saver"
                description="A small app to save and load the current opened folders and its locations on the screen. You can have multiple independent saves and load them at any time to reopen the folders exactly where you left them. Right click for options. Double click to exit."
                image="./images/foldersaver.png" download="./downloads/foldersaver/FolderSaver.zip">
            </my-simplepage>
        </my--foldersaver>
        
        <my--mft>
            <my-simplepage title="MFT"
                description="MFT (multi file templates) is a small app to generate files according to some variables.<br><br>When editing, you can add templates, edit the template files and add and edit variables.<br>Then, after pressing 'run' or exporting as a runnable, you can edit the variables that you want to rune the template with, then run the template once or multiple times, choosing where the files are saved individually. You can have variables not only in the template text, but also on the individual and global file paths."
                image="./images/mft.png" download="./downloads/mft/MFT.zip">
            </my-simplepage>
        </my--mft>
        
        <my--mutedtray>
            <my-simplepage title="Muted Tray"
                description="A small app to display the muted state of your current microphone. You may also use it to mute/unmute your microphone with right click. Double click to exit."
                image="./images/mutedtray.png" download="./downloads/mutedtray/mutedtray.zip">
            </my-simplepage>
        </my--mutedtray>
        
        <my--netblocker>
            <my-simplepage title="Net Blocker"
                description="A small app to add application rules to the firewall."
                image="./images/netblocker.png" download="./downloads/netblocker/netblocker.zip">
            </my-simplepage>
        </my--netblocker>
    `
}