import FullList from "../model/FullList";

interface DOMList {
  ul: HTMLUListElement,
  clear(): void,
  render(FullList: FullList): void
} 

export default class ListTemplate implements DOMList {

  ul: HTMLUListElement // initialise "ul" here because we didn't do it as parameter of constructor below

  static instance: ListTemplate = new ListTemplate()
  
  private constructor() {
    this.ul = document.getElementById("listItems") as HTMLUListElement
  }

  clear(): void {
    this.ul.innerHTML = ''
  }

  render(fullList: FullList): void {
    this.clear()

    fullList.list.forEach(item => {
      // Creating "li"
      const li = document.createElement("li") as HTMLLIElement
      li.className = "item"

      // Creating checkbox
      const check = document.createElement("input") as HTMLInputElement
      check.type = "checkbox"
      check.id = item.id
      check.checked = item.checked

      check.addEventListener('change', () => {
        item.checked = !item.checked
        fullList.save()
      })

      // Creating label of checkbox
      const label = document.createElement("label") as HTMLLabelElement
      label.htmlFor = item.id
      label.textContent = item.item
      
      // Creating delete button 
      const button = document.createElement("button") as HTMLButtonElement
      button.className = "button"
      button.textContent = "X"
      
      button.addEventListener('click', () => {
        fullList.removeItem(item.id)
        this.render(fullList)
      })

      li.append(check)
      li.append(label)
      li.append(button)
      this.ul.append(li)
    })

  }

}