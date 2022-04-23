export class Instructor{

  id: number = -1;
  instructorName: string = "";
  image: Blob = null;

  constructor(instructorName?: string, image?: Blob) {
    this.instructorName = instructorName;
    this.image = image;
  }

}
