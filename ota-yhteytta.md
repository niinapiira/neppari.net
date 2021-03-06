---
forms: true
"page-title": Ota yhteyttä
"page-type": form
"navigation-order": 90
"show-in-navigation": true
published: true
"link-title": ""
polaroid: ""
---


<!--
    Jos muutat tämän tiedoston nimeä (ota-yhteytta.md),
    muista muuttaa se myös _config.yml -tiedostoon
-->

Alla olevalla lomakkeella voit lähettää minulle helposti yhteydenottopyynnön tai muun viestin. Halutessasi voit myös soittaa tai lähettää minulle itse sähköpostia osoitteeseen <a href="mailto:{{ site.contact.email.normal }}">{{ site.contact.email.normal }}</a>.

Nepparin toimiston osoitteen ja ohjeet miten löytää sinne [saat klikkaamalla tästä](/reittiohjeet).

---

<script>
    function toggleInput(id) {
        var checkbox = document.getElementById("show-" + id),
            input = document.getElementById(id),
            inputDisplay = checkbox.checked ? "block" : "none";

        if (input.style.display !== undefined) {
            input.style.display = inputDisplay;
        }
    }

    function checkInfo(e) {
        var name = document.getElementById("name").value,
            email = document.getElementById("email").value,
            telephone = document.getElementById("telephone").value;

        document.getElementById("subject").value = "Yhteydenotto Nepparin kotisivuilta – " + name + " (" + Date.now() + ")";

        if (name === "") {
            alert("Hei! Kirjoitathan myös nimesi sille varattuun kenttään, kiitos!");
            return false;
        }

        if (email === "" && telephone === "") {
            alert("Hei! Annathan joko sähköposti- tai puhelinnumerosi, jotta voin ottaa sinuun yhteyttä. Kiitos!");
            return false;
        }

        return true;
    }
</script>

<form class="pure-form pure-form-stacked contact-form" name="ota-yhteytta" data-netlify="true" onsubmit="return checkInfo();" method="POST" action="/kiitos-viestistasi">

    <input type="hidden" id="subject" name="subject" value="Yhteydenotto Nepparin kotisivuilta" />

    <input type="hidden" name="Muista" value="KUN VASTAAT TÄHÄN VIESTIIN, MUISTA MUUTTAA VASTAANOTTAJAN SÄHKÖPOSTIOSOITE ITSE ALLA MAINITUKSI!" />

    <div class="contact-form-part">
        <label for="name">Nimesi</label>
        <input id="name" type="text" name="name" class="pure-input-2-3" placeholder="Kirjoita nimesi tähän">
    </div>

    <div class="contact-form-part">
        <label for="show-email" class="pure-checkbox">
            <input id="show-email" type="checkbox" value="" onclick="toggleInput('email');">
            Haluan, että minuun otetaan yhteyttä sähköpostilla
        </label>
        <input id="email" type="email" name="email" class="pure-input-2-3" style="display: none;"
            placeholder="Kirjoita sähköpostiosoitteesi tähän">
    </div>

    <div class="contact-form-part">
        <label for="show-telephone" class="pure-checkbox">
            <input id="show-telephone" type="checkbox" value="" onclick="toggleInput('telephone');">
            Haluan, että minuun otetaan yhteyttä puhelimella
        </label>
        <input id="telephone" type="tel" name="telephone" class="pure-input-2-3" style="display: none;"
            placeholder="Kirjoita puhelinnumerosi tähän">
    </div>

    <div class="contact-form-part">
        <label for="foo">Viestisi</label>
        <textarea id="message" name="message" class="pure-input-1" placeholder="Ja kirjoita varsinainen viestisi tähän"></textarea>
    </div>

    <div class="contact-form-part">
        <input type="submit" name="submit" class="pure-button pure-input-1-2 pure-button-primary"
            value="Lähetä viesti" />
    </div>

</form>

<div class="other-things">
    <hr/>

    Muut asiat:
    <ul>
        <li><a href="/virheilmoitukset">
            Virheilmoitukset Nepparin palvelusta
        </a></li>
    </ul>
</div>



