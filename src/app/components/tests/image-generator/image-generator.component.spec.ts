import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ImageGeneratorComponent } from "./image-generator.component";
import { HuggingfaceService } from "../../../services/huggingface.service";
import { of } from "rxjs"; // ✅ needed for mock return

// ✅ Mock class definition
class MockHuggingfaceService {
  generateImage() {
    return of("mock-image-url");
  }
}

describe("ImageGeneratorComponent", () => {
  let component: ImageGeneratorComponent;
  let fixture: ComponentFixture<ImageGeneratorComponent>;

  // ✅ Replace the old beforeEach with this one
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImageGeneratorComponent],
      providers: [
        { provide: HuggingfaceService, useClass: MockHuggingfaceService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ImageGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(ImageGeneratorComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  // it("should create", () => {
  //   expect(component).toBeTruthy();
  // });
});
