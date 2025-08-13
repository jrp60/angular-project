import { Component, OnDestroy, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import * as signalR from "@microsoft/signalr";

@Component({
  selector: "app-tests",
  templateUrl: "./tests.component.html",
  styleUrls: ["./tests.component.css"],
})
export class TestsComponent implements OnInit, OnDestroy {
  newMessage = "";
  rabbitAlive = true;
  receivedMessages: string[] = [];
  private hubConnection!: signalR.HubConnection;
  attemptedSend: boolean = false; // nueva variable

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.startSignalRConnection();
  }

  ngOnDestroy() {
    if (this.hubConnection) this.hubConnection.stop();
  }

  startSignalRConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(
        "https://messageapi-austriaeast-01.azurewebsites.net/hub/messagereceived"
      )
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start().catch(() => {
      this.rabbitAlive = false;
    });

    this.hubConnection.on("ReceiveMessage", (msg: string) => {
      this.receivedMessages.push(msg);
    });

    this.hubConnection.onclose(() => {
      this.rabbitAlive = false;
    });
  }

  sendMessage() {
    if (!this.newMessage.trim()) return;

    this.attemptedSend = true; // marcamos que hubo intento

    this.http
      .post(
        "https://messageapi-austriaeast-01.azurewebsites.net/api/message",
        JSON.stringify(this.newMessage),
        { headers: { "Content-Type": "application/json" } }
      )
      .subscribe({
        next: () => {
          this.newMessage = "";
          this.rabbitAlive = true;
        },
        error: () => (this.rabbitAlive = false),
      });
  }
}
